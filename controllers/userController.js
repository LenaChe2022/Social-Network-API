const { User, Thought } = require('../models');


module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) =>  res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      //.populate('thoughts')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

   //Update a user
   updateUser(req,res) {
     User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
     )
     .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
   },

  //Delete a user and remove a user's associated thoughts.
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId})
  //OK remove a user's associated thoughts:  
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({ _id: {$in: user.thoughts}})
      )
      .then(() => res.json({ message: `User with all their thoughts deleted forever!` }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add new friend to a user's friend list
  addFriend(req,res) {
   User.findOneAndUpdate(
    { _id: req.params.userId},
    { $addToSet: {friends: req.params.friendId}},
    { new: true }
   )
   .then((user) =>
    !user 
       ? res.status(404).json({
         message: 'No such user exists',
       })
       : res.json('New friend added 🎉')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // Remove a friend from a user's friend list
  removeFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $pull: {friends: req.params.friendId}},
      { new: true }
     )
     .then((user) =>
      !user 
         ? res.status(404).json({
           message: 'No such user exists',
         })
         : res.json('You are not friends any more...')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },

};
