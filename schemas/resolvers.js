const {
  Animal,
  MedicalNeeds,
  Research,
  Tags,
  User,
  Zoo,
} = require("../models");
const Notes = require("../models/Notes");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    //Animal
    animals: async () => {
      return Animal.find().populate("discussions");
    },
    animal: async (parent, { name }) => {
      return Animal.findOne({ name }).populate("discussions");
    },

    // Keeper Query =========
    users: async () => {
      return User.find().populate("discussions");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("discussions");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("notes");
      }
      throw new AuthenticationError("Error message");
    },
    // Discussion Query ======
    notes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Notes.find(params).sort({ createdAt: -1 });
    },
    discussion: async (parent, { noteId }) => {
      return Notes.findOne({ _id: noteId });
    },

    //Medical Needs =======
    medicalNeeds: async () => {
      return MedicalNeeds.find();
    },
    medicalNeed: async (_, { _id }) => {
      return MedicalNeeds.findById(_id);
    },

    //Tag
    tags: async () => {
      return Tags.find().populate("notes");
    },
    tag: async (parent, { name }) => {
      return Tags.findOne({ name }).populate("notes");
    },

    //Zoo
    zoos: async () => {
      return Zoo.find().populate("animals");
    },
    zoo: async (parent, { name }) => {
      return Zoo.findOne({ name }).populate("animals");
    },
  },
  Mutation: {
    //Animal
    // addAnimal: async (
    //   parent,
    //   {
    //     name,
    //     species,
    //     family,
    //     zoo,
    //     weight,
    //     diet,
    //     reproduction,
    //     offspring,
    //     partner,
    //     medicalNeeds,
    //   }
    // ) => {
    //   const animal = await Animal.create({
    //     name,
    //     species,
    //     family,
    //     zoo,
    //     weight,
    //     diet,
    //     reproduction,
    //     offspring,
    //     partner,
    //     medicalNeeds,
    //   });
    //   const token = signToken(animal);
    //   return { token, animal };
    // },
    addAnimal: async (_, args) => {
      try {
        const animal = await Animal.create(args);
        console.log("Created Animal: ", animal);
        return animal; // Make sure you return the created animal
      } catch (error) {
        throw new Error("Unable to create the animal.");
      }
    },
    updateAnimal: async (
      parent,
      {
        name,
        species,
        family,
        zoo,
        weight,
        diet,
        reproduction,
        offspring,
        partner,
        medicalNeeds,
      }
    ) => {
      const animal = await Animal.findOneAndUpdate({
        name,
        species,
        family,
        zoo,
        weight,
        diet,
        reproduction,
        offspring,
        partner,
        medicalNeeds,
      });
      const token = signToken(animal);
      return { token, animal };
    },
    deleteAnimal: async (parent, { animalId }, context) => {
      if (context.animal) {
        return Animal.findOneAndUpdate(
          { _id: animalId },
          {
            $pull: {
              comments: {
                _id: animalId,
                commentAuthor: context.keeper.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Error message");
    },
    // Keeper Mutation =========
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    //Medical Needs
    addMedicalNeed: async (_, { type, details }) => {
      const medicalNeed = new MedicalNeeds({ type, details });
      await medicalNeed.save();
      return medicalNeed;
    },
    updateMedicalNeed: async (_, { _id, type, details }) => {
      const updatedMedicalNeed = await MedicalNeeds.findByIdAndUpdate(
        _id,
        { type, details },
        { new: true }
      );
      return updatedMedicalNeed;
    },
    deleteMedicalNeed: async (_, { _id }) => {
      const deletedMedicalNeed = await MedicalNeeds.findByIdAndDelete(_id);
      return deletedMedicalNeed;
    },

    // Discussion Mutation ====
    addNote: async (parent, { discussionText }, context) => {
      if (context.user) {
        const discussion = await Notes.create({
          discussionText,
          discussionAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { discussions: discussion._id } }
        );

        return discussion;
      }
      throw new AuthenticationError("Error message");
      ("You need to be logged in!");
    },
    addComment: async (parent, { discussionId, commentText }, context) => {
      if (context.keeper) {
        return Notes.findOneAndUpdate(
          { _id: discussionId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Error message");
    },
    removeNotes: async (parent, { discussionId }, context) => {
      if (context.user) {
        const discussion = await Notes.findOneAndDelete({
          _id: discussionId,
          discussionAuthor: context.keeper.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { discussions: discussion._id } }
        );

        return discussion;
      }
      throw new AuthenticationError("Error message");
    },
    removeComment: async (parent, { discussionId, commentId }, context) => {
      if (context.user) {
        return Notes.findOneAndUpdate(
          { _id: discussionId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Error message");
    },
    //Tag Mutations ========>
    addTag: async (parent, args) => {
      const tag = await Tags.create(args);
      const token = signToken(tag);
      return { token, tag };
    },
    //Zoo mutations ========>
    addZoo: async (parent, args) => {
      const zoo = await Zoo.create(args);
      const token = signToken(zoo);
      return { token, zoo };
    },
    removeZoo: async (parent, { zooId }, context) => {
      if (context.keeper) {
        const zoo = await Zoo.findOneAndDelete({
          _id: zooId,
        });

        return zoo;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};
module.exports = resolvers;
