const { Schema, model } = require("mongoose");
const Notes = require("./Notes");

const animalSchema = new Schema(
  {
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    age: {
      type: String,
    },
    parents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    research_projects: [
      {
        type: String,
      },
    ],
    species: {
      type: String,
    },
    family: {
      type: String,
    },
    captivity: {
      type: String,
    },
    zooName: {
      type: Schema.Types.ObjectId,
      ref: "Zoo",
    },
    weight: {
      type: Number,
    },
    diet: [
      {
        type: String,
        trim: true,
      },
    ],
    reproduction: {
      type: Boolean,
    },
    offspring: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    partner: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    medicalNeeds: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalNeeds",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notes",
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
  },
  {
    strictPopulate: false, // Allow populating fields not defined in the schema
  }
);

const Animal = model("Animal", animalSchema);
module.exports = Animal;
