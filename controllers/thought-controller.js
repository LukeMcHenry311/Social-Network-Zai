const { Thought, User } = require("../models");

const thoughtController = {
  // GET to get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThought) => {
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // GET to get single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        selet: "-__v",
      })
      .selet("-__v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No Thought found with this ID" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  createThought({ parms, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: parms.userId },
          { $push: { thoughts: _id } },
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

  updateThought({ parms, body }, res) {
    Thought.findByIdAndUpdate({ _id: URLSearchParams.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "reactions",
        selet: "-__v",
      })
      .selet("-__v")
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
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
        selet: "-__v",
      })
      .selet("-__v")
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
