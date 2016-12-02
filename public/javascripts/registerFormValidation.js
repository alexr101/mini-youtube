//Validation for the register form

//Cache Elements
var $form = $("#form-register");
var $headerInput = $form.find("#header-input");
var $profileInput = $form.find("#profile-input");

var $username = $form.find("#username-input");
var $password = $form.find("#password");
var $motto = $form.find("#motto");

var $genderInput = $form.find("#gender-input");
var $about = $form.find("#about");
var $city = $form.find("#city");

var $state = $form.find("#state");
var $email = $form.find("#email");
var $emailConfirm = $form.find("#email-confirm");

//Bind events to validation
$form.on("submit", function(e){
    var validate = true;
    var errorMsg = "Please fill out the following fields: <br>";

    if($headerInput.val() == ""){
        errorMsg += "Header image <br>"
        validate = false;
    }
    
    if($profileInput.val() == ""){
        errorMsg += "Profile image <br>"
        validate = false;
    }
    
    if($genderInput.val() == ""){
        errorMsg += "Gender <br>"
        validate = false;
    }
    
    if($username.val() == ""){
        errorMsg += "Username <br>"
        validate = false;
    } else {
    
        if($username.val().length < 1){
            errorMsg += "Username must be more than one character <br>"
            validate = false;
        }
        
        if($username.val().length > 12){
            errorMsg += "Username must be less than 12 characters <br>"
            validate = false;
        }
    }
    
    if($password.val() == ""){
        errorMsg += "Password <br>"
        validate = false;
    }
    
    if($motto.val() == ""){
        errorMsg += "Slogan <br>"
        validate = false;
    }
    
    if($about.val() == ""){
        errorMsg += "About you <br>"
        validate = false;
    }
    
    if($city.val() == ""){
        errorMsg += "City <br>"
        validate = false;
    }
    
    if($state.val() == ""){
        errorMsg += "State <br>"
        validate = false;
    }
    
    if($email.val() == ""){
        errorMsg += "Email <br>"
        validate = false;
    }
    
    if($emailConfirm.val() == ""){
        errorMsg += "Confirm email <br>"
        validate = false;
    }
    
    if($emailConfirm.val() != $email.val()){
        errorMsg += "Emails don't match <br>"
        validate = false;
    }
    
    if(validate == false){
        $("p#error").show().html(errorMsg);
        e.preventDefault();
        
        //Reset the scroll settings on the header miage
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
    
});