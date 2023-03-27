const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        //make Trimmed
        trim: true,
        },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'User email required'],
        // Must match a valid email address 
        validate: {
          validator: function(v) {
            return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
          },
          message: props => `${props.value} is not a valid email adress!`
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
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Create a virtual called 'friendCount' that retrieves the length of the user's friends array field on query.
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

// Initialize my User model
const User = model('user', userSchema);

module.exports = User;
