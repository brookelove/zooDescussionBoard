const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const tagSchema = new Schema(
  {
    tagName: {
      type: String,
    },
    backgroundColor: {
      type: String,
      default: "#008080",
    },
    color: {
      type: String,
      default: "#000000",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
tagSchema
  .virtual("getTagCss")
  // Getter
  .get(function () {
    return `color: ${this.color}`;
  });

const Tag = model("tag", tagSchema);

module.exports = Tag;
