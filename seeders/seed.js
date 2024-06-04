const db = require("../config/connection");
const {
  Animal,
  MedicalNeeds,
  Notes,
  Research,
  Tags,
  User,
  Zoo,
} = require("../models");
const animalSeeds = require("./animalSeeds.json");
const medicalNeedSeeds = require("./medicalNeedSeeds.json");
const notesSeeds = require("./notesSeeds.json");
const researchSeeds = require("./researchSeeds.json");
const tagSeeds = require("./tagSeeds.json");
const userSeeds = require("./userSeeds.json");
const zooSeeds = require("./zooSeeds.json");

const seedDatabase = async () => {
  try {
    // Clean the existing data
    await Animal.deleteMany({});
    await MedicalNeeds.deleteMany({});
    await Notes.deleteMany({});
    await Research.deleteMany({});
    await Tags.deleteMany({});
    await User.deleteMany({});
    await Zoo.deleteMany({});

    // Seed the Animal data
    await Animal.create(animalSeeds);

    // Seed the Medical Needs data
    await MedicalNeeds.create(medicalNeedSeeds);

    // Seed the Notes data
    // await Notes.create(notesSeeds);

    // Seed the Research data
    // await Research.create(researchSeeds);

    // Seed the Tags data
    await Tags.create(tagSeeds);

    // Seed the User data
    // await User.create(userSeeds);

    // Seed the Zoo data
    // await Zoo.create(zooSeeds);

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
