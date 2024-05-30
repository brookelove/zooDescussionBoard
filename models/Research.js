const { Schema, model } = require("mongoose");

const researchSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  beginning_date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  ending_date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Animal",
    },
  ],
  awards: [
    {
      type: String,
    },
  ],
});

const Research = model("Research", researchSchema);
module.exports = Research;
