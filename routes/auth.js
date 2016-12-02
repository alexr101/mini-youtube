var express = require('express');
var router = express.Router();
var tempProfileImage = "/images/default/user-logo-2.png";
var tempHeaderImage = "/images/default/profile-header-2.jpg";
const fs = require("fs");
var formidable = require("formidable");
var path = require("path");
var utility = require("../utilities/utility-functions.js");
var s3 = require("s3");
var s3UploadLink = "https://s3.amazonaws.com/mini-tube-images/uploads/";

//Find Amazon S3 Account
var client = s3.createClient({
  maxAsyncS3: 20,     
  s3RetryCount: 3,    
  s3RetryDelay: 1000, 
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,  
  s3Options: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});


module.exports = function(passport){
	
	//Successful registration or login
	router.get("/success", function(req, res){
		
		//get req referer
		var referer = req.header("Referer");
		
		//If login from a video then set up page scroll amount for comments
		if(referer.includes("video") || referer.includes("embed")){
			
			var amount = utility.commentScrollAmount(req.device.type);
			var scrollAmount = encodeURIComponent(amount);
			//remove previous scroll parameters from url
            var updatedReferer = utility.removeParam("/?scroll", referer);
            
			res.redirect(updatedReferer + "/?scroll=" + scrollAmount);
			
		//If user just registered reset the temp images & redirect to new video
		} else if (referer.includes("register")) {
			
			//res.send({state: "success", user: req.user ? req.user: null});
			tempProfileImage = "/images/default/user-logo-2.png";
			tempHeaderImage = "/images/default/profile-header-2.jpg";
			res.redirect("/video/new");
		} else {
			res.redirect(referer);
		}
	});
	
	//Failure in login or registration
	//Req Flash manages display errors
	router.get("/failure", function(req, res){
		
		res.redirect(req.header("Referer"));
		
	});
	
	//Registration Routes
	router.route('/register')
	
		.get(function(req, res){
			
			res.render('register', {
				tempProfileImage: tempProfileImage, 
				tempHeaderImage: tempHeaderImage,
				profileInputValue: (!tempProfileImage.includes("default")) ? tempProfileImage : "",
				headerInputValue: (!tempHeaderImage.includes("default")) ? tempHeaderImage : ""
			});
		})
		
		.post(passport.authenticate("signup", {
			successRedirect: "/auth/success",
			failureRedirect: "/auth/failure",
		}));
	
	//Login Routes
	router.route('/login')
	
		.get(function(req, res){
			res.render("user-login");	
		})
		
		.post(passport.authenticate("login",{
			successRedirect: "/auth/success",
			failureRedirect: "/auth/failure"
		}));
	
	//Logout route
	router.route('/logout')
	
		.get(function(req, res){
			req.logout();
			req.flash().success = "Successfully logged out";
			res.redirect(req.header("Referer"));
		});
		
	//Upload image Route
	router.post("/upload-image", function(req, res){
		
		//create new form with formidable plugin and incoming form
		var form = new formidable.IncomingForm();

		//use formidable to parse the request form, and make it readable
		form.parse(req, function(err, fields, files) {
			
			//check if files exist, if they don't a page refresh while uploading would crash the server
			if(typeof files.upload !== "undefined"){
				
				var imageType = fields.imageType;
				var filePath = files.upload.path;
				var imageDirectory = "uploads/";
				var imageName = filePath.substring(filePath.indexOf("upload_") + 7);
				
				//parameters for uploading the file to Amazon S3
				var params = {
					localFile: filePath,
					s3Params: {
							Bucket: "mini-tube-images",
							Key: imageDirectory + imageName,
						},
				};
				
				//upload the file to Amazon S3
				var uploader = client.uploadFile(params);
				
				//Log any errors with the upload
				uploader.on('error', function(err) {
					console.error("unable to upload:", err.stack);
				});
				
				//Called when the file has finishes uploading
				uploader.on('end', function() {
					
					function verifyAndReturnImage(imageVariable){
						
						//imageKey created from following link format
						//https://s3.amazonaws.com/mini-tube-images/uploads/load_c3daca29b022908120cd799a3337e48a
						var imageKey = imageVariable.substring(imageVariable.indexOf("images/") + 7);
						
						//If the image is not the default temp image then delete the old Amazon S3 image
						if ((!imageVariable.includes("default"))){
							utility.removeS3Image( imageVariable, client, imageKey );
						}
						
						return s3UploadLink + imageName;	
					}
					
					//Change the temp images based on the incoming image type
					if(imageType == "header"){
						tempHeaderImage = verifyAndReturnImage(tempHeaderImage);
					} else if (imageType == "profile"){
						tempProfileImage = verifyAndReturnImage(tempProfileImage);
					}
					
					//send response to uploadImage.js (only file calling this at the moment)
					//to update the registration image input on registration form
					res.send({
						headerImg: tempHeaderImage,
						profileImg: tempProfileImage
					});

				});
			} else {
				console.log("image failed to upload");
				req.flash().error = "Image failed to upload";
				res.end();
			}
			
		});
		
	})

	return router;
};


	
		
		
