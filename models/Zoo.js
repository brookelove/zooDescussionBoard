const { Schema, model } = require("mongoose");

const zooSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  established_date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  staff: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  research_projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Research",
    },
  ],
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Animal",
    },
  ],
  habitats: [
    {
      type: String,
    },
  ],
  awards: [
    {
      type: String,
    },
  ],
});

const Zoo = model("Zoo", zooSchema);
module.exports = Zoo;
