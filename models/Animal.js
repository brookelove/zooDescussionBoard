const { Schema, model } = require("mongoose");

const animalSchema = new Schema(
  {
    name: {
      type: String,
    },
    species: {
      type: String,
    },
    family: {
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
    discussions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
  },
  {
    strictPopulate: false, // Allow populating fields not defined in the schema
  }
);

const Animal = model("Animal", animalSchema);
module.exports = Animal;
