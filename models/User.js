const { Schema, model } = require('mongoose');


//user schema with mongoose
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    //email validation is within string type
    type: String,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    required: true,
    unique: true,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
  //tell schema it can use virtuals
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//get total amount of friends on retrieval (virtual) 
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

//create the User model
const User = model('User', UserSchema);


//export User model
module.exports = User;