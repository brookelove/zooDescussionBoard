const db = require("../config/connection");
const { Animal, Discussion, Keeper, Zoo } = require("../models");
const animalSeeds = require("./animalSeeds.json");
const discussionSeeds = require("./discussionSeeds.json");
const keeperSeeds = require("./keeperSeeds.json");
const zooSeeds = require("./zooSeeds.json");

const seedDatabase = async () => {
  try {
    // Clean the existing data
    await Animal.deleteMany({});
    await Discussion.deleteMany({});
    await Keeper.deleteMany({});
    await Zoo.deleteMany({});

    // Seed the Animal data
    await Animal.create(animalSeeds);

    // Seed the Discussion data
    await Discussion.create(discussionSeeds);

    // Seed the Keeper data
    await Keeper.create(keeperSeeds);

    // Seed the Zoo data
    await Zoo.create(zooSeeds);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    // Close the database connection
    db.close();
  }
};

seedDatabase();
