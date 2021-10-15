const { Thought, User } = require("../models");

const thoughtController = {
  // GET to get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ createdAt: -1 })
      .then((dbThought) => {
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // GET to get single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findById(params.id)
      .populate({
        path: "reactions",
        selet: "-__v",
      })
      .select("-__v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thoughts found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: dbThought._id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thoughts found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidator: true,
    })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thoughts found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteThought({ parms }, res) {
    Thought.findByIdAndDelete({ _id: params.id })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thoughts found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thoughts found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "no thoughts found" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = thoughtController;
