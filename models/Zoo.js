const { Schema, model } = require("mongoose");

const zooSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  keepers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Keeper",
    },
  ],
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: "animal",
    },
  ],
});

const Zoo = model("Zoo", zooSchema);
module.exports = Zoo;
