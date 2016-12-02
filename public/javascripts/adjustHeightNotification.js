//Adjusts the position of an object if an error is displayed on the top of the screen.
//used for absolute positioned objects that won't move automatically

var $error = $("p.notification");
var $elementsToBeadjusted = $(".error-height-adjust");

//If any req.flash() error is currently displaying
if($error.is(":visible")){
    
    //If the element is the show-menu-container set up the top property instead of margin
    if($elementsToBeadjusted.hasClass("user-show-menu-container")){
        //set the top property based on the outerheight of the error element
        $elementsToBeadjusted.css("top", $error.outerHeight());
    } else {
        $elementsToBeadjusted.css("marginTop", $error.outerHeight());  
    }
}


