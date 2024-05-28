const dateFormat = require("../utils/dateFormat");
const { Schema, model } = require("mongoose");
const directMessageSchema = new Schema({
  username: {
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
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
});

const DirectMessage = model("DirectMessage", directMessageSchema);
module.exports = DirectMessage;
