var express = require('express');
var router = express.Router();
var request = require("request");
var mongoose = require("mongoose");
var Video = mongoose.model("Video");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");
var Sequence = require('sequence').Sequence
var sequence = Sequence.create();
var utility = require("../utilities/utility-functions.js");
var err;

//Middleware - Check if user is logged in
var isLoggedIn = function(req, res, next){

	if(!res.locals.currentUser){
		req.flash().error = "Please login to upload a video";
		res.redirect("/auth/login");
	} else {
		next();
	}
}


router.route('/new')

	.get(isLoggedIn, function(req, res){
		res.render('video-new');
	})
	
	.post(isLoggedIn, function(req, res){
		
		//Save current user for async api call
		var currentUser = res.locals.currentUser;
		var video_id = "";

		//Video properties for api call
		var sourceLink = req.body.source;
		var videoId = sourceLink.substring(32, 43);
		var category = req.body.category;
		var youtubeImageLink = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
		
		//API information for Youtube video lookup
		var googleApiKey = process.end.GOOGLE_API_KEY;
		var apiLink = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId;
			apiLink += "&key=" + googleApiKey;
			apiLink += "&fields=items(snippet(title,description, tags),contentDetails(duration))&part=snippet,contentDetails";
		
		//Call the Youtube api to get video information based on the videoId
		request(apiLink, function(err, response, next){
			//Parse the response from the api
			var json = JSON.parse(response.body);
			//change the embed source otherwise video will not play in certain
			//devices and browsers
			var embedSource = sourceLink.replace("watch?v=", "v/");
			var title = json.items[0].snippet.title;
			var description = json.items[0].snippet.description;
			var tags = json.items[0].snippet.tags;
			var duration = json.items[0].contentDetails.duration;
			//convert time to h:m:s
			duration = utility.convert_time(duration);
			
			//create new video object based on req.body
			var newVideo = {
				title: title,
				description: description,
				youtube_id: videoId,
				tags: tags,
				duration: duration,
				source: embedSource,
				category: category,
				preview_image_link: youtubeImageLink,
				views: Math.floor(Math.random() * 10000),
				likes: Math.floor(Math.random() * 10000),
				favorited: Math.floor(Math.random() * 10000),
				date: Date.now(),
				created_by: currentUser,
			};
			
			//Create the new video based on newVideo object
			Video.create(newVideo, function(err, video){
				if(err){
					console.log(err);
					return;
				}
				
				//Save this video to the current user's list of "created" uploaded videos
				res.locals.currentUser.uploaded_videos.push(video);
				res.locals.currentUser.save();
				
				//convert the new mongoose object id to a string
				//special case for when mongoose objects are just created
				//You can't just look up video._id
				var video_id = video._id.toString();
				
				req.flash().success = "Your video has been uploaded...check it out!"
				res.redirect("/video/" + video_id);
			});
		});
	});

router.route('/:id')
	.get(function(req, res){
		
		//Setup a Synchronous sequence to get video
		sequence
		
		//Find the video
		.then(function (next) {
			
			//Find the video in the link param
			Video.findById(req.params.id).populate("created_by comments").exec(function(errVideo, video){
				//Check for errors
				if(errVideo){
					console.log(errVideo);
					next(errVideo);
				} else if (video == null){
					console.log("Video does not exist");
					next('Video does not exist');
				//If no errors
				} else {
					//get the video category to send to the next sequence function and find "related" videos
					var videoCategory = video.category;
					
					//populate user and reply comments in the comments if they exist
					if(video.comments.length > 0){
						
						//queries for comment populations
						var populateQuery = [
							{ path: "user", select: "username profile_image" },
							{ path: "replies.comment", select: "text likes user" },
						]
						
						//Populate the comments
						Comment.populate(video.comments, populateQuery, function(errComment, populatedComment){
							if(errComment){
								console.log(errComment);
								next(errComment, video, videoCategory);
							}
							
							//Populate users within the populated replies :) Whew!
							Comment.populate(populatedComment, {
								path:"replies.comment.user", 
								select:"username profile_image",
								model:"User"
							}, function(err, populatedReply){
	
								next(err, video, videoCategory);
							})
							
						});
					//If no comments on the video
					} else {
						next(err, video, videoCategory);
					}
				}
			});
		})
		
		//Find other videos in the same category
		.then(function (next, err, video, videoCategory) {
			
			//find videos on the same category
			Video
			.find({category: videoCategory})
			.limit(7)
			.exec(function(error1, relatedVideos){
				
				if(error1){
					err = err + error1
					next(err, video);
				} else {
					
					//Populate the users for the related videos
					User.populate(relatedVideos, {
						path:"created_by",
						select:"username",
						model:"User"
					}, function(error2, populatedVideo){
						
						if(error2){
							err = err + error2
							next(err, video, relatedVideos);
						} else {
							next(err, video, relatedVideos);
						}
					})
				}
			})
		})
		
		//Render page if no errors
		.then(function (next, err, video, relatedVideos) {

			if(err === null || typeof err === "undefined"){
				
				res.render('video-show', {
					video: video, 
					relatedVideos: relatedVideos ? relatedVideos : null,
					device: req.device.type
				});
				
			} else {
				
				console.log("Video render error: " + err);
				req.flash().error = err;
				res.redirect("/")
				
			}
			next();
		});
		
	})

	.put(function(req, res){
		res.send('edit video');
	})

	.delete(function(req, res){
		res.send('delete video');
	});

module.exports = router;