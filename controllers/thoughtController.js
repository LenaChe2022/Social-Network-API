// ObjectId() method for converting usrerId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Friend, Thought } = require('../models');

module.exports = {
//Get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
   
//Create a new thought
// example data
//{
//    "thoughtText": "Here's a cool thought...",
//    "username": "lernantino",
//    "userId": "5edff358a0fcb779aa7b118b"
//  }    
    createThought(req,res) {
        Thought.create(req.body)
             .then((thought) => {
                return User.findOneAndUpdate(
                  { _id: req.body.userId },
                  { $addToSet: { thoughts: thought._id } },
                  { new: true }
                );
              })
              .then((user) =>
                !user
                ? res.status(404).json({
                 message: 'Thought created, but found no user with that ID',
                })
                : res.json('The thought created 🎉')
              )
             .catch((err) => {
              console.log(err);
              res.status(500).json(err);
              });
              },

    //Get a single thought:
     getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .lean()
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
     },


    //Update a thought
     updateThought(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
         });
     },

     //Remove a thought
     deleteThought(req,res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'Thought deleted but no user with this id!' })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
     }, 

};