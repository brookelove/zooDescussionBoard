import { Schema, model } from "mongoose";
const dateFormat = require("../utils/dateFormat");

const discussionSchema = new Schema({
  userName: {
    type: Schema.Types.ObjectId,
    ref: "Keeper",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  media: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
});

const Discussion = model("Discussion", discussionSchema);
export default Discussion;
