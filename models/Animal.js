import { Schema, model } from "mongoose";

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  species: {
    type: String,
  },
  family: {
    type: String,
  },
  zoo: {
    type: Schema.Types.ObjectId,
  },
  weight: {
    type: Integer,
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
    },
  ],
  partner: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  medicalNeeds: [
    {
      type: String,
    },
  ],
});

const Animal = model("Animal", animalSchema);
module.exports = Animal;
