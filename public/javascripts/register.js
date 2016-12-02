//For this page I was experimenting with javascript and jquery variations
//I also setup the whole page as opposed to separate DOM elements :s

//Set up register page 


var imageInput = (function(){
    
    //CACHE DOM
    var pageDiv = document.querySelectorAll("#page-wrapper");
    var form_register = $("#form-register")[0];
    var form_profile_image = $(pageDiv).find("#form-profile-image")[0];
    var form_header_image = $(pageDiv).find("#form-header-image");
    var imageInputs = document.querySelectorAll(".image-input");
    var genderInput = $(pageDiv).find("#gender-input");
    var genderSelectors = $(pageDiv).find(".gender-input");
    var maleSelector = $(pageDiv).find("#male-input")[0]
    var femaleSelector = $(pageDiv).find("#female-input")[0];
    var submitButton = $(pageDiv).find("#submit-btn")[0];
    var profileImageContainer = $(pageDiv).find("#profile-image-container")[0];
    var profileImage = $(pageDiv).find("#profile-image")[0];
    var imageSelectorDivs = $(pageDiv).find(".image-selector");
    var imageSelectorImgs = $(pageDiv).find(".image-selector img");
    var imageSelectorParagraphs = $(pageDiv).find(".image-selector p");
    
    //Set up Bouncejs variables for the gender selector inputs
    var bounce = new Bounce();
    bounce.scale({
        from: { x: .9, y: .9 },
        to: { x: 1, y: 1 }, 
        duration: 1500
    });
    
    var deepBounce = new Bounce();
    deepBounce.scale({
        from: { x: .5, y: .5 },
        to: { x: 1, y: 1 }, 
        duration: 1500
    });

    //BIND EVENTS
    genderSelectors.on("click", toggleGenderSelector);
    genderSelectors.mouseover(playAnimation);
    $(submitButton).mouseover(playAnimation);
    imageSelectorDivs.hover(changePictureSize, changePictureSize);
    
    //Update header image scroll limitiations
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
    
    
    //FUNCTIONS
    
    //play gender divs animation
    function playAnimation(){
        bounce.applyTo(this);
    }
    
    //Toggle the color of the gender selectors
    function toggleGenderSelector(){
        var selectedInput = this;
        
        $(selectedInput).addClass("selected-gender");
        deepBounce.applyTo(selectedInput);
        
        Array.prototype.map.call(genderSelectors, function(selector){
            if(selector != selectedInput){
                $(selector).removeClass("selected-gender");
            }
        });
        
        //change text value
        adjustGenderValue(this);
    }
    
    //Change text value of gender selectors
    function adjustGenderValue(selector){
        if(selector == maleSelector){
            $(genderInput).val("male");
        } else {
            $(genderInput).val("female");
        }
    }
    
    //Change size of camera icons on the header profile section
    function changePictureSize(){
        
        var $thisDiv = $(this);
        var imageSize;
        var fontSize;
        var marginTop;
        
        //Detects if mouse if current hovering over the div to determine the change in size
        if ($thisDiv.is(":hover")) {
            imageSize = "17px";
            fontSize = "12px";
            marginTop = "2px";
        } else {
            imageSize = "20px"
            fontSize = "14px"
        }
        
        //Change the size of camera icon
        Array.prototype.map.call(imageSelectorImgs, function(img){
    
            var $img = $(img);
            
            if($thisDiv.has($img).length){
                $img.css("width", imageSize) 
            }
        });
        
        //Change the size of the text beside the camera icon
        Array.prototype.map.call(imageSelectorParagraphs, function(paragraph){
            var $paragraph = $(paragraph);
            
            if($thisDiv.has($paragraph).length){
                $paragraph.css({
                    "fontSize": fontSize,
                    "marginTop": marginTop ? marginTop : 0 
                });
            }
        });
        
    }
})()
