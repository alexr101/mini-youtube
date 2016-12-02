var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Video = mongoose.model("Video");
var User = mongoose.model("User");

//USER routes
router.route('/:id')
	
	.get(function(req, res){
		
		//find user based on user name
		//TO DO: Case insensitive queries
		User.find({"username": req.params.id})
			.populate({
				path: "favorite_videos uploaded_videos",
				select: "description likes title views preview_image_link created_by",
				model: "Video",
				populate: { 
					path: 'created_by',
					select: 'username profile_image',
					model: 'User'
				}
			}).exec(function(err, foundUser){
				
				//Catch user errors
				if(err){
					req.flash().error = err
					res.redirect(req.header("Referer"));
					
				//populates user errors are not caught in mongoose unless you set index 0
				} else if(typeof foundUser[0] == "undefined") {
					req.flash().error = "User does not exist";
					res.redirect("/");
				
				} else {
					
					//Convert mongoose object to regular object
					var convertedUser = foundUser[0]
					res.render('user-show', {populatedUser: convertedUser});
				}

		});
	})

	.put(function(req, res){
		//get if of current used based on logged in user data
		var currentUserId = res.locals.currentUser._id;

		User.findById(currentUserId, function(err, user){
			if(err){
				console.log(err);
				res.redirect(req.body.currentUrl);
			}
			
			function returnIfExists(objectToBeVerified, objectIfNoExist){
				//return object if it exists otherwise return second parameter
				return (objectToBeVerified != undefined) ? objectToBeVerified : objectIfNoExist;
			}
			
			//Save all user information manually based on whether it that parameter was edited or not
			user.username = returnIfExists(req.body.username, user.username); 
			user.email = returnIfExists(req.body.email, user.email); 
			user.phone = returnIfExists(req.body.phone, user.phone);
			user.gender = returnIfExists(req.body.gender, user.gender);
			user.city = returnIfExists(req.body.city, user.city);  
			user.state = returnIfExists(req.body.state, user.state);  
			user.about = returnIfExists(req.body.about, user.about); 
			user.slogan = returnIfExists(req.body.slogan, user.slogan);
			user.payment[0].card_type = returnIfExists(req.body.card_type, user.payment[0].card_type);; 
			user.payment[0].card_last_four = returnIfExists(req.body.card_last_four, user.payment[0].card_last_four); 
			user.payment[0].exp_year = returnIfExists(req.body.exp_year, user.payment[0].exp_year); 
			user.payment[0].cvc = returnIfExists(req.body.cvc, user.payment[0].cvc);

			user.save();
			
			req.flash().success = "Your information has been updated!";
			res.redirect(req.header("Referer"));
		});
	})

	.delete(function(req, res){
		res.send('TODO: delete user :( ' + req.params.id);
	})

//Add favorite videos to user data
router.get("/favoriteVideo/add/:id", function(req, res){

	Video.findById(req.params.id, function(err, video){
		
		//Only favorite videos if logged in
		if(res.locals.currentUser){
			
			var videoFound = false;
			
			//loop through all the favorite videos to see if it's already saved
			for(var i = 0; i < res.locals.currentUser.favorite_videos.length; i++){
				
				//user favorite video id
				var videoId = res.locals.currentUser.favorite_videos[i];
				
				//See if favorite video id matches current video if it does then don't allow to favorite again
				if(videoId == video._id.toString()){
					videoFound = true;
					res.send("Video already on favorites!");
					break;
				} 
			}
			
			//If video is not found then add to favorites
			if(!videoFound){
				video.favorited += 1;
				video.save();
				res.locals.currentUser.favorite_videos.push(video);
				res.locals.currentUser.save()
				res.send("Video saved!");
			}
			
		} else {
			res.send("You gotta login to FAVE your videos!")
		}

	})
})

//Remove favorite videos from user data
router.post("/favoriteVideo/remove/:id", function(req, res){
	
	Video.findById(req.params.id, function(err, video){
		
		if(res.locals.currentUser){
			
			var videoFound = false;
			
			//loop through all the favorite videos to see if it's already saved
			for(var i = 0; i < res.locals.currentUser.favorite_videos.length; i++){
				
				//User favorite video id
				var videoId = res.locals.currentUser.favorite_videos[i];
				
				//See if favorite video id matches current video if it does then don't allow to favorite again
				if(videoId == video._id.toString()){
					videoFound = true;
					res.locals.currentUser.favorite_videos.splice(i, 1);
					res.locals.currentUser.save();
					video.favorited -= 1;
					video.save();
					console.log(req.body.sourceUrl);
					res.send(req.body.sourceUrl);
					break;
				} 
			}
			
			//If video is not found then add to favorites
			if(!videoFound){
				res.send("Video not on favorites");
			}
			
		} else {
			//login form
			req.flash().error = "Please login again";
			res.redirect("/");
		}
	});
});


module.exports = router;