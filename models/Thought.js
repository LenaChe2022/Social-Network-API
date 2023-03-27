const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema for what makes up a thought
const thoughtSchema = new Schema(
{
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    },
  createdAt:{
    type: Date,
    //Set default value to the current timestamp
     default: Date.now,
    //Use a getter method to format the timestamp on query            
          get: (date) => {
            if (date) return date.toLocaleString('en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            });
          },
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
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });  

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;