//Upload an image.
//Instantly update the image and send the image to the server for saving in the S3 Amazon bucket

//Cache elements
var $imageUploader = $(".image-uploader");
var $divButtons = $imageUploader.find(".image-selector");
var $imageInput = $(".image-input");
var senderPage = window.location.href;
var $eventSender;

//Set up the button as event sender and click the image input
$divButtons.on("click", function(){
    $eventSender = $(this);
    $imageInput.click();
})

$imageInput.on("change", getImageFile);

//Get the file from the input element and send the next function
function getImageFile(){

    var $imageToChange = $eventSender.siblings(".image-to-change");
    
    if($imageToChange.length == 0){
        $imageToChange = $eventSender.siblings(".profile-image-circle").find(".image-to-change");
    }
    
    var minHeight = $eventSender.attr("data-min-height");
    var minWidth = $eventSender.attr("data-min-width");
    
    var imageFile = $(this).get(0).files;
    var imageBlob = window.URL.createObjectURL($(this).get(0).files[0]);
    verifyImageSize($imageToChange, imageFile, imageBlob, minHeight, minWidth);
}

//Validate the image size
function verifyImageSize(image, imageFile, imageBlob, minHeight, minWidth){
    
    //create this image object to use the onload functions
    //the onload function can detect size
    var img = new Image();
    
    img.onload = function(){
        
        //Send error message if it doesn't meed the standards
        if (this.width < minWidth || this.height < minHeight){
            var errorMsg = "Image needs to be at least " + minWidth + " pixels in width ";
            errorMsg += "and " + minHeight + " pixels in height"
            alert(errorMsg);   
        //Go on through :)
        } else {
            updateImage(image, imageFile, imageBlob);
        }
    }
    
    $(img).attr("src", imageBlob);

}

//Update the image in the DOM + update header scroll + send upload post request
function updateImage(image, imageFile, imageBlob){
    image.attr("src", imageBlob)
    uploadImage(imageFile);
    updateImageDrag();
}

//Update the scroll amount of the image
function updateImageDrag(){
    $(function() {
        var $profileImageContainer = $("#profile-image-container")
        var $profileImage = $("#profile-image");
        var $notification = $(".notification");
        var $headerPositionInput = $("#header-position");
        
        var profileImageHeight = $profileImage.height();
        var profileImageContainerHeight = $profileImageContainer.height();
        var searchBarHeight = 55;
        var notificationHeight = ($notification.is(":visible")) ? $notification.height() : 0;
        var screenWidthAdjustment = 0;
        
        if(window.innerWidth > 1050){
            screenWidthAdjustment = window.innerWidth - 1050;
        }
        
        var bottomY = Math.floor((profileImageHeight * -1) + notificationHeight + screenWidthAdjustment + searchBarHeight + 30 + profileImageContainerHeight) ;
        var topY = searchBarHeight + notificationHeight;

        $profileImage.draggable({
            snap: false,
            //x1, y1, x2, y2
            //profileimageheight* - 1 + 75 + 300
            containment: [0, bottomY, 0, topY],
            drag: function(event, ui){
                var imagePosition = $profileImage.css("top");
                $headerPositionInput.val(imagePosition);
            }
        });
    });
}

//Send the image to the server to be saved in Amazon S3 server
function uploadImage(imageFile){
    if(imageFile.length > 0){
        
        var formData = new FormData();
        //Set up the image type ("header" or "profile")
        var imageType = $eventSender.attr("data-image-type");
        
        formData.append("imageType", imageType)
        formData.append("upload", imageFile[0], imageFile[0].name);
        
        //make sure that the page hasn't been refresh so the API doesn't create any crash errors
        if(senderPage == window.location.href){
            $.ajax({
                url: "/auth/upload-image",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){
                    //Update input value of the image, so it can be sent along with the form
                    if(imageType == "header"){
                        $("#header-input").val(data.headerImg);
                    } else {
                        $("#profile-input").val(data.profileImg);
                    }

                }
            })
        }
    }
}
