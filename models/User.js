const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  personal_id: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phone_number: {
    type: String,
    required: true,
  },
  zooName: {
    type: Schema.Types.ObjectId,
    ref: "Zoo",
  },
  research_projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Research",
    },
  ],
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  discussions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
