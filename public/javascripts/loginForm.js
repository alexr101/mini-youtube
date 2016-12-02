//Show and hide the login form

$(document).ready(function(){
    //Cache Elements
    var $loginFormTrigger = $(".login-form-trigger");
    var $loginForm = $(".login-form");
    var $cancelButton = $loginForm.find("#cancel-btn");
    
    //Bind Events
    $loginFormTrigger.on("click", showLoginForm);
    $cancelButton.on("click", toggleLoginForm);
    
    //Functions
    
    //Show the login form on comments or header
    function showLoginForm(){
        var $this = $(this);
        $loginForm.hide();
        $this.after($loginForm);
        $loginForm.show();
        
        //If you activate the form from the header
        if($this.hasClass("header-trigger")){
            var topMargin;
            var leftMargin;
            
            //adjust position of form based on window size (responsive)
            if (window.innerWidth > 767){
                leftMargin = "-148px";
                topMargin = "10px";
            } else if (window.innerWidth > 575){
                leftMargin = "-112px";
                topMargin = "20px";
            } else if (window.innerWidth > 499) {
                leftMargin = "-125px";
                topMargin = "20px";
            } else{
                leftMargin = "-140px";
                topMargin = "20px";
            }
            
            //Setup login form
            $loginForm.css({
                "margin-top": topMargin,
                "left" : leftMargin,
            })
        //Activate the form from the comments section
        } else {
            $loginForm.css({
                "margin-top": "-230px",
                "left" : "120px",
            })
        }
    }
    
    function toggleLoginForm(){
        $loginForm.toggle();
    }
});