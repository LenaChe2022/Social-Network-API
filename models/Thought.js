const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema for what makes up a thought
const thoughtSchema = new Schema(
{
  thoughtText: {
    type: String,
    required: true,
    //OK: Must be between 1 and 280 characters
    minlength: 1,
    maxlength: 280,
    },
  createdAt:{
    type: Date,
//OK: Set default value to the current timestamp
     default: Date.now,
//OK: Use a getter method to format the timestamp on query
  },  
  username: {
    type: String,
    required: true,
  },
  reactions: [Reaction],
},
{
   toJSON: {
     virtuals: true,
     getters: true,
      },
      id: false,
}
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
postSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });  

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;