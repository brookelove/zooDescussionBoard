const dateFormat = require("../utils/dateFormat");
const { Schema, model } = require("mongoose");
const notesSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  animal: {
    type: Schema.Types.ObjectId,
    ref: "Animal",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  note: {
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

const Notes = model("notes", notesSchema);
module.exports = Notes;
