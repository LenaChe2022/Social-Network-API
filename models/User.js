const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

//validate property function for email
const validator = require('validator');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        //TODO Trimmed
        },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
            },
        },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'thought',
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'user',
        },
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//OK Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
