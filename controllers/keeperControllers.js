const { Keeper, Discussion } = require("../models");

const keeperController = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await Keeper.find().select("-__v");

      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get single user by id
  async getSingleUser(req, res) {
    try {
      const user = await Keeper.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("discussions");

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await Keeper.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a Keeper
  async updateKeeper(req, res) {
    try {
      const user = await Keeper.findOneAndUpdate(
        { _id: req.params.KeeperId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!user) {
        return res.status(404).json({ message: "No Keeper with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete Keeper (BONUS: and delete associated discussions)
  async deleteKeeper(req, res) {
    try {
      const user = await Keeper.findOneAndDelete({
        _id: req.params.KeeperId,
      });

      if (!user) {
        return res.status(404).json({ message: "No Keeper with this id!" });
      }

      // BONUS: get ids of Keeper's `discussions` and delete them all
      await Discussion.deleteMany({ _id: { $in: user.discussion } });
      res.json({ message: "Keeper and associated discussions deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add friend to friend list
  async addFriend(req, res) {
    try {
      const user = await Keeper.findOneAndUpdate(
        { _id: req.params.KeeperId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No Keeper with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // remove friend from friend list
  async removeFriend(req, res) {
    try {
      const user = await Keeper.findOneAndUpdate(
        { _id: req.params.KeeperId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

export default keeperController;
