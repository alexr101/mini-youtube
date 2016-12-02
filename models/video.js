var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
    youtube_id: String,
    title: String,
    source: String,
    description: String,
    tags: [String],
    views: Number,
    likes: Number,
    favorited: Number,
    duration: String,
    date: {type: Date, default: Date.now()},
    preview_image_link: String,
    category: String,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
    ]
});

var Video = mongoose.model("Video", videoSchema);

module.exports = Video;