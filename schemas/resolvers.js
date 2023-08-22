const { Keeper, Discussion, Animal, Tag, Zoo } = require("../models");
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
    keepers: async () => {
      return Keeper.find().populate("discussions");
    },
    keeper: async (parent, { username }) => {
      return Keeper.findOne({ username }).populate("discussions");
    },
    me: async (parent, args, context) => {
      if (context.keeper) {
        return Keeper.findOne({ _id: context.keeper._id }).populate(
          "discussions"
        );
      }
      throw new AuthenticationError("Error message");
    },
    // Discussion Query ======
    discussions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Discussion.find(params).sort({ createdAt: -1 });
    },
    discussion: async (parent, { discussionId }) => {
      return Discussion.findOne({ _id: discussionId });
    },

    //Tag
    tags: async () => {
      return Tag.find().populate("discussions");
    },
    tag: async (parent, { name }) => {
      return Tag.findOne({ name }).populate("discussions");
    },

    //Zoo
    zoos: async () => {
      return Zoo.find().populate("discussions");
    },
    zoo: async (parent, { name }) => {
      return Zoo.findOne({ name }).populate("discussions");
    },
  },
  Mutation: {
    //Animal
    addAnimal: async (
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
      const animal = await Animal.create({
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
    addKeeper: async (parent, args) => {
      const keeper = await Keeper.create(args);
      const token = signToken(keeper);
      return { token, keeper };
    },
    login: async (parent, { email, password }) => {
      const keeper = await Keeper.findOne({ email });

      if (!keeper) {
        throw new AuthenticationError("Error message");
      }

      const correctPw = await keeper.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Error message");
      }

      const token = signToken(keeper);

      return { token, keeper };
    },
    // Discussion Mutation ====
    addDiscussion: async (parent, { discussionText }, context) => {
      if (context.keeper) {
        const discussion = await Discussion.create({
          discussionText,
          discussionAuthor: context.keeper.username,
        });

        await User.findOneAndUpdate(
          { _id: context.keeper._id },
          { $addToSet: { discussions: discussion._id } }
        );

        return discussion;
      }
      throw new AuthenticationError("Error message");
      ("You need to be logged in!");
    },
    addComment: async (parent, { discussionId, commentText }, context) => {
      if (context.keeper) {
        return Discussion.findOneAndUpdate(
          { _id: discussionId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.keeper.username },
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
    removeDiscussion: async (parent, { discussionId }, context) => {
      if (context.keeper) {
        const discussion = await Discussion.findOneAndDelete({
          _id: discussionId,
          discussionAuthor: context.keeper.username,
        });

        await Keeper.findOneAndUpdate(
          { _id: context.keeper._id },
          { $pull: { discussions: discussion._id } }
        );

        return discussion;
      }
      throw new AuthenticationError("Error message");
    },
    removeComment: async (parent, { discussionId, commentId }, context) => {
      if (context.keeper) {
        return Discussion.findOneAndUpdate(
          { _id: discussionId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.keeper.username,
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
      const tag = await Tag.create(args);
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
