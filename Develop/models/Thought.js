const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => { moment.unix(timestamp).format("MM-DD-YYYY hh:mm")
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],  
    },
    {
        toJSON: {
          getters: true,
        },
        
        id:false,
        
      }
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('thoughts', thoughtSchema);
module.exports = Thought;