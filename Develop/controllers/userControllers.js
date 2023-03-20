const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
    // Get all users
    getUser(req, res) {
      User.find()
        .then(async (users) => {
          // const userObj = {
          //   users,
          //   username,
          //   email
          // };
         res.json(users);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single user
    getSingleUser(req, res) {
      console.log(req.params.userId)
      User.findOne({ _id: req.params.userId })
        .populate("thoughts friends")
        // .select('-__v')
        // .lean()
        .then(async (user) =>
          {
            console.log(user)
           !user
          ? res.status(404).json({ message: "No user with this id!" })
          
          //   
            // : 
           :res.json({
                user,
                // thoughts: await thoughts(req.params.userId),
                // friends: await friends(req.params.userId),
              })
            })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

      // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Delete a user and remove their associated thoughts
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
          res.status(200).send("User Deleted");
        //   !user
        //     ? res.status(404).json({ message: 'No such user exists' })
        //     : Thought.deleteMany(
        //         { username: user.username },
        //         // { $pull: { user: req.params.userId } },
        //         // { new: true }
        //       )
            })
        // .then((thoughts) =>{
        //   !thoughts
        //     ? res.status(404).json({
        //         message: 'User deleted, but no thoughts found',
        //       })
        //     : res.json({ message: 'User successfully deleted' })
        // })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add a new friend to a User's friend list
    addFriend(req, res) {
     
      User.findOneAndUpdate(
       
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true },
        console.log('Friend request accepted!'),
      console.log(req.body)
      )
        .then((user) => {
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        })
        .catch((err) => {res.status(500).json(err)});
    },
    // Remove friend from a user's friend list
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },
  };