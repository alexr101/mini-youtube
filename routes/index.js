var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Video = mongoose.model("Video");
var appData = require("../utilities/appData.js");
var videoCategories = appData.videoCategories;

//Initialize home page variables
function declareVariables(req, res, next){
    res.locals.categories = [];
    res.locals.allVideos = [];
    videoCategories = appData.videoCategories;
    next();
}

//Find all the video categories
function findVideoCategory(req, res, next){
    
    var categories = [];
    
    //Recursive function to loop 
    //for loops don't work in Nodejs due to it async nature
    function repeaterLoop(i) {
        
        if( i < videoCategories.length) {
            
            //current category based on appData category array
            var category = videoCategories[i];
            
            //Find videos based on category
            Video.find({
                category: category
            }).sort({
                date: -1
            }).populate({
                path: "created_by",
                select: "username profile_image",
                model: "User"
            }).exec(function(err, videos){
                if(err){
                    //If an error break from the loop by setting it to the length of the array
                    console.log(err);
                    repeaterLoop(videoCategories.length);
                }
                
                //Create a new category in array based on current category
                //This will be used to uniquely identify each one
                categories[category] = videos;
                
                //repeat loop
                repeaterLoop(i+1);
                
            });
            
        } else {
            //Set up a res.locals variable with categories and their videos to access from next function
            res.locals.categories = categories; 
            next();

        }
    }

    repeaterLoop(0);
}

var middleware = [findVideoCategory];

/* GET home page. */
router.get('/', declareVariables, findVideoCategory, function(req, res) {
    
    //render index page with all videos organized by category
    res.render("index", {
        allVideosByCategory: res.locals.categories
    });
    
});

module.exports = router;
