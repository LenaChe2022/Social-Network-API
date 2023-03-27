const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
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
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);



module.exports = reactionSchema;