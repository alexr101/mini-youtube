var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Video = mongoose.model("Video");

/* GET Account. */
router.route('/:id')
	.get(function(req, res){
		
		//get only if user is logged in
		if(res.locals.currentUser){
			
			//Find user's favorite videos to show on the account
			Video.populate(res.locals.currentUser, {
				path: "favorite_videos",
				select: "title views preview_image_link created_by",
				model: "Video",
				populate: { 
					path: 'created_by',
					select: 'username profile_image',
					model: 'User'
				}
			}, function(err, populatedUser){
				if(err){
					console.log(err);
					res.redirect(req.header("Referer"));
				}
				res.render('account-show', {populatedUser: populatedUser});	
			});
			
		} else {
			res.render('user-login');
		};
		
	})

module.exports = router;