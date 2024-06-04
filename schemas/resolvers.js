const {
  Animal,
  MedicalNeeds,
  Notes,
  Research,
  Tags,
  User,
  Zoo,
} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //Animal
    animals: async () => {
      return await Animal.find()
        .populate("notes")
        .populate("zooName")
        .populate("tags")
        .populate("medicalneeds");
    },
    animal: async (_, { name }) => {
      return Animal.findOne({ name }).populate("notes").populate("zooName");
    },

    //Medical Needs =======
    medicalNeeds: async () => {
      return MedicalNeeds.find();
    },
    medicalNeed: async (_, { _id }) => {
      return MedicalNeeds.findById(_id);
    },
    // Notes Query ======
    notes: async (_, { username }) => {
      const params = username ? { username } : {};
      return Notes.find(params).sort({ createdAt: -1 });
    },
    note: async (_, { noteId }) => {
      return Notes.findById(noteId);
    },

    //Research
    researches: async (_, { username }) => {
      const params = username ? { username } : {};
      return Research.find(params).sort({ createdAt: -1 });
    },
    research: async (_, { researchId }) => {
      return Research.findById(researchId);
    },

    //Tag
    tags: async () => {
      return Tags.find();
    },
    tag: async (_, { name }) => {
      return Tags.findOne({ name });
    },

    // User Query =========
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username });
    },
    me: async (_, __, { user }) => {
      if (user) {
        return User.findById(user._id);
      }
      throw new AuthenticationError("You need to be logged in");
    },

    //Zoo
    zoos: async () => {
      return Zoo.find().populate("animals");
    },
    zoo: async (_, { name }) => {
      return Zoo.findOne({ name }).populate("animals");
    },
  },
  Mutation: {
    //Animal
    addAnimal: async (_, args) => {
      try {
        const animal = await Animal.create(args);
        console.log("Created Animal: ", animal);
        return animal;
      } catch (error) {
        throw new Error("Unable to create the animal.");
      }
    },
    updateAnimal: async (_, args) => {
      try {
        const { id, ...updates } = args;
        const updatedAnimal = await Animal.findByIdAndUpdate(id, updates, {
          new: true,
        });
        return updatedAnimal;
      } catch (error) {
        throw new Error("Unable to update the animal.");
      }
    },
    removeAnimal: async (_, { animalId }, { user }) => {
      if (user) {
        const deletedAnimal = await Animal.findByIdAndDelete(animalId);
        return deletedAnimal;
      }
      throw new AuthenticationError("You need to be logged in");
    },

    //Medical Needs
    addMedicalNeed: async (_, args) => {
      const medicalNeed = new MedicalNeeds(args);
      await medicalNeed.save();
      return medicalNeed;
    },
    updateMedicalNeed: async (_, args) => {
      const { _id, ...updates } = args;
      const updatedMedicalNeed = await MedicalNeeds.findByIdAndUpdate(
        _id,
        updates,
        { new: true }
      );
      return updatedMedicalNeed;
    },
    removeMedicalNeed: async (_, { _id }) => {
      const deletedMedicalNeed = await MedicalNeeds.findByIdAndDelete(_id);
      return deletedMedicalNeed;
    },

    // Notes Mutation ====
    addNote: async (_, { note }, { user }) => {
      if (user) {
        const newNote = await Notes.create({
          ...note,
          noteAuthor: user.username,
        });

        await User.findByIdAndUpdate(user._id, {
          $addToSet: { notes: newNote._id },
        });

        return newNote;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addComment: async (_, { noteId, commentText }, { user }) => {
      if (user) {
        return Notes.findByIdAndUpdate(
          noteId,
          {
            $addToSet: {
              comments: { commentText, commentAuthor: user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeNote: async (_, { noteId }, { user }) => {
      if (user) {
        const deletedNote = await Notes.findOneAndDelete({
          _id: noteId,
          noteAuthor: user.username,
        });

        if (deletedNote) {
          await User.findByIdAndUpdate(user._id, {
            $pull: { notes: noteId },
          });
        }

        return deletedNote;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeComment: async (_, { discussionId, commentId }, { user }) => {
      if (user) {
        return Notes.findByIdAndUpdate(
          discussionId,
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },

    // Research Mutations ======>
    addResearch: async (_, args) => {
      const research = await Research.create(args);
      const token = signToken(research);
      return { token, research };
    },
    updateResearch: async (_, args) => {
      try {
        const { id, ...updates } = args;
        const updatedResearch = await Research.findByIdAndUpdate(id, updates, {
          new: true,
        });
        return updatedResearch;
      } catch (error) {
        throw new Error("Unable to update the research.");
      }
    },
    removeResearch: async (_, { researchId }, { user }) => {
      if (user) {
        const deletedResearch = await Research.findByIdAndDelete(researchId);
        return deletedResearch;
      }
      throw new AuthenticationError("You need to be logged in");
    },

    //Tag Mutations ========>
    addTag: async (_, args) => {
      const tag = await Tags.create(args);
      const token = signToken(tag);
      return { token, tag };
    },

    // User Mutation =========
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Incorrect email or password");
      }

      const token = signToken(user);
      return { token, user };
    },

    //Zoo mutations ========>
    addZoo: async (_, args) => {
      const zoo = await Zoo.create(args);
      const token = signToken(zoo);
      return { token, zoo };
    },
    updateZoo: async (_, args) => {
      try {
        const { _id, ...updates } = args;
        const zoo = await Zoo.findByIdAndUpdate(_id, updates, { new: true });
        if (!zoo) {
          throw new Error("Zoo not found");
        }
        console.log("Updated Zoo: ", zoo);
        return zoo; // Return the updated Zoo
      } catch (error) {
        console.error(error);
        throw new Error("Unable to update the Zoo.");
      }
    },
    removeZoo: async (_, { zooId }, { user }) => {
      if (user) {
        const deletedZoo = await Zoo.findByIdAndDelete(zooId);
        return deletedZoo;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
