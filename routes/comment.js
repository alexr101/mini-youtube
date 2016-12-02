var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");
var Video = mongoose.model("Video");
var utility = require("../utilities/utility-functions.js");

//post
router.post("/new", function(req, res){
    
    //create new comment objest based on incoming req.body
    var comment = { 
        text: req.body.text,
        user: res.locals.currentUser,
        username: res.locals.currentUser.username
    }
    
    //create comment
    Comment.create(comment, function(err, newComment){
        if(err){
            console.log(err);
        }
        
        //Add comment to User Data
        res.locals.currentUser.comments.push(newComment);
        res.locals.currentUser.save();
        
        //reply comments have hidden parent commentIds attached to them        
        if(req.body.commentId){
            
            //Find PARENT comment
            Comment.findById( req.body.commentId , function(err, parentComment){
                
                if(err){
                    console.log(err);
                    req.flash().error = err;
                    res.redirect(req.header("Referer"));
                }
                
                //create new comment object
                var replyComment = {
                    comment: newComment,
                }
                
                //Add comment to parent and save 
                parentComment.replies.push(replyComment);
                parentComment.save();
                
                setPageScroll();
            });
        
        //Regular comment
        } else {
            
            //Save comment directly to video
            Video.findById( req.body.videoId, function(err, video){
                
                if(err){
                    console.log(err);
                    req.flash().error = err;
                    res.redirect(req.header("Referer"));
                }
                
                //Add commment to video and save
                video.comments.push(newComment);
                video.save()

                setPageScroll();
            })
        }
        
        //Set the amount of the page scroll after a new comment
        function setPageScroll(){
            //Set scroll amount and redirect
            var referer = req.header("Referer");
            
			var amount = utility.commentScrollAmount(req.device.type);
			var scrollAmount = encodeURIComponent(amount);
			
            //Remove previous scroll amouts from link
            var updatedReferer = utility.removeParam("/?scroll", referer);
            
			res.redirect(updatedReferer + "/?scroll=" + scrollAmount);
        }
    
    });
});

router.route("/:id")
    
    //Edit comments
    .put(function(req, res){
        res.send("TODO: edit comment " + req.params.id)
    })
    
    //Delete comment
    .delete(function(req, res){
        res.send("TODO: delete comment " + req.params.id);
    });

module.exports = router;