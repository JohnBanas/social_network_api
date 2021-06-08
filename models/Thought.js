const { Schema, model } = require('mongoose');
//date format npm
const { formatDate } = require('date-utils-2020');


//reaction schema
const ReactionSchema = new Schema({
  //set custom id to avoid confusion with parent id (comment _id)
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: 'Please leave a reaction!',
    maxLength: 280
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => formatDate(createdAtVal)
  }
},
  {
    toJSON: {
      getters: true
    }
  });



//user schema with mongoose
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => formatDate(createdAtVal, 'dd/MM/yyyy hh:mm')
  },
  username: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  reactions: [ReactionSchema]
},
  //tell schema it can use virtuals & getters
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//get total amount of reactions on retrieval (virtual) 
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
})

//create the Thought model
const Thought = model('Thought', ThoughtSchema);

//export Thought model
module.exports = Thought;