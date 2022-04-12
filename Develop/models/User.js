const { Schema, model } = require('mongoose');
const Thought = require('./Thought')
const userSchema = new Schema(
    {
      username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
      },
      email: {
          type: String,
          required: true,
          unique: true,
          match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Provide a valide email address"] ,
      },
      thoughts: [
          {
          type: Schema.Types.ObjectId,
          ref: 'thoughts',  
          },
      ],
      friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'user',   
      }
    ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.pre("findOneAndDelete", async function(next) {
  console.log("Pre function");
 try {
  const deletedThoughts = await Thought.deleteMany({
    _id: {$in: this.thoughts}
  })
  console.log(deletedThoughts);
  return next()
}
  catch(err) {
   return next(err)
  }
});

const User = model('user', userSchema);

module.exports = User;