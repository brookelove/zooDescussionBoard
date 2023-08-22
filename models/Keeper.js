import { Schema, model } from "mongoose";
const bcrypt = require("bcrypt");

const keeperSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  discussions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
keeperSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

keeperSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

keeperSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const Keeper = model("User", keeperSchema);

export default Keeper;
