const { Schema, model } = require('mongoose');
//email validation npm package mongoose-type-email
//https://github.com/konsumer/mongoose-type-email
require('mongoose-type-email');


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
    type: SchemaTypes.Email,
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
  return this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
})

//delete thoughts associated with user, if user is deleted
//modified from stackoverflow question https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
//from [robertfoenix](https://stackoverflow.com/users/8010396/robertfoenix) answer
User.pre('deleteOne', function (next) {
  return this.model('Thought').deleteMany({ username: this._id }, next);
})


//create the User model
const User = model('User', UserSchema);

//export User model
module.exports = User;