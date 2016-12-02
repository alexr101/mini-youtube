var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    date: { type:Date, default: Date.now()},
    likes: {type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String,
    replies: [
        {
           comment: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
           },
        },   
    ]
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;