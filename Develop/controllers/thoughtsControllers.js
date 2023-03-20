const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          { $push: { thoughts: thoughts._id } },
          {new: true}
        ).then((user) =>
        res.json(user))
        // res.json(thoughts);

      })

      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.updateOne(
              { thoughts: req.params.thoughtId },
              {
                $pull: { thoughts: req.params.thoughtId },
              }
            )
      )
      .then(() => res.json({ message: "Thought and user deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId},
        { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
            console.log(req.body)
        )
        .then((data) => {
        !data
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(data)
        })
      .catch((err) => res.status(500).json(err));
},

    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId},
            {$pull: {reactions: req.body}},
        { runValidators: true, new: true },
          console.log(req.params.reactionId)
        )
        .then((thoughts) => {
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughts)
        })
      .catch((err) => res.status(500).json(err));
    }
};


