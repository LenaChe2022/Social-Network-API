// ObjectId() method for converting usrerId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Friend, Thought } = require('../models');


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
            // {
            //   user,
            //   grade: await grade(req.params.userId),
            //})
      )
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

  // Delete a user and remove a user's associated thoughts.
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId})
  //TODO: ???? remove a user's associated thoughts:  
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json({ message: `User deleted forever!` })
          //: Thought.deleteMany({ _id: { $in: user.thoughts} })
          
          // .findOneAndUpdate(
          //   { _id: req.params.userId },
          //   { $pull: { thought: { thoughtId: req.params.thoughtId } } },
          //   { runValidators: true, new: true }
          //   )
      )
   //TODO:  remove a user's associated thoughts.  
      // .then((course) =>
      //   !course
      //     ? res.status(404).json({
      //         message: 'Student deleted, but no courses found',
      //       })
      //     : res.json({ message: 'Student successfully deleted' })
      // )
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



  // Add an assignment to a student
  // addAssignment(req, res) {
  //   console.log('You are adding an assignment');
  //   console.log(req.body);
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // Remove assignment from a student
  // removeAssignment(req, res) {
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
