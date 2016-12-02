var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    username_lower: String,
    password: String,
    email: String,
    gender: String,
    city: String,
    state: String,
    about: String,
    slogan: String,
    phone: String,
    profile_image: String,
    header_image: String,
    header_position: String,
    subscribers: {type:Number, default: 0},
    payment: [{
        card_type: String,
        card_number: String,
        card_last_four: Number,
        exp_month: String,
        exp_year: Number,
        cvc: Number
    }],
    uploaded_videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }   
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    favorite_videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    ratings:{
        videos: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Video"
                },
                type: String
            }
        ],
        comments:[
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment"
                },
                type: String
            }    
        ]
    }
});

var User = mongoose.model("User", userSchema);

module.exports = User;