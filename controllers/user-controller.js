const { User } = require("../models");

const UserController = {
  getAllUsers(req, res) {
    User.find({})
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        selet: "-__v",
      })
      .populate({
        path: "friends",
        selet: "-__v",
      })
      .selet("-__v")
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUser) => {
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateUserById({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidator: true,
    })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteUserById({ params }, res) {
    User.findByIdAndDelete({ _id: params.userId })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .selet("-__v")
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .selet("-__v")
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "no user found" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = UserController;
