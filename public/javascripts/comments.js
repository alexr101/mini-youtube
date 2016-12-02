//Set up functionality for comments, comment form and their buttons

//Cache general elements
var $commentSection = $("#comments");
var allComments = document.querySelectorAll(".comment");
var replyForm = $commentSection.find(".replyForm")[0];
var $newCommentTextarea = $("#user-comment");
var $newCommentButtons = $("#replyButtons");
var $newComment_submitBtn = $newCommentButtons.find(".btn-submit");
var $newComment_cancelBtn = $newCommentButtons.find(".btn-cancel");

//Cache element property elements
function cacheElements(){
	
	//Reply form cache
	replyForm.submitBtn = $(replyForm).find("#submitReply")[0];
	replyForm.cancelBtn = $(replyForm).find("#cancelReply")[0];
	replyForm.textarea = $(replyForm).find("textarea")[0];
	replyForm.commentId = $(replyForm).find("#comment-id")
	
	//cache comments if they exist
	if(allComments){
		
		Array.prototype.map.call(allComments, function(comment){
			comment.replyBtn = $(comment).find(".btn-reply");
			comment.likeBtn = $(comment).find(".btn-like");
			comment.dislikeBtn = $(comment).find(".btn-dislike");
			comment.likeCount = $(comment).find(".like-count");
			comment._id = $(comment).find(".id");
		});
	}
}

cacheElements();

//Bind Elements to their event listeners
function bindElements(){
	
	//If comments exist bind them
	if(allComments){
		Array.prototype.map.call(allComments, function(comment){
			comment.replyBtn[0].addEventListener("click", appendForm.bind(comment));
			comment.likeBtn[0].addEventListener("click", commentLikes.bind(comment, 1));
			comment.dislikeBtn[0].addEventListener("click", commentLikes.bind(comment, -1));
		});
	}
	
	//Event listner for reply form
	replyForm.cancelBtn.addEventListener("click", cancelReply.bind(replyForm));
	
	//Event listeners for the user new comment box on top of the video
	$newCommentTextarea.on("click", showNewCommentButtons);
	$newComment_cancelBtn.on("click", hideNewCommentButtons);
}

bindElements();


//Show the reply form if user clicks on reply button
function appendForm(){
	
	$(replyForm).show();
	setReplyFormId(replyForm, this);
	
	clearReplyForm()

	//appends after the main comment div
	$(this).append($(replyForm));
}

//Sets the parent ID of the reply
//This ID is used for saving it to the parent comment in the backend
function setReplyFormId(form, comment){
	form.commentId[0].value = comment._id[0].innerText;
}

//clear text and hide form
function cancelReply(){
	clearReplyForm();
	$(this).hide();
}

//clear reply form text
function clearReplyForm(){
	$(replyForm.textarea).val('');
}

//Up or down tick comment likes, and display on document
function commentLikes(number){
	var currentLikes = parseInt(this.likeCount[0].innerText);
	this.likeCount[0].innerText = currentLikes + number;
}

//Show the user comment buttons
function showNewCommentButtons(){
	$newCommentButtons.show();
}

//Hide the user comment buttons
function hideNewCommentButtons(){
	$newCommentButtons.hide();
	$newCommentTextarea.val('');
}





