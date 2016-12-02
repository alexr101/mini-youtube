//Functionality for the user menu hidden below the user accout image in the header

//Cache
var $authenticationDiv = $("#authentication");
var channelImgDiv = $authenticationDiv.find("#channel-tab");
var $userMenu = $authenticationDiv.find("#user-menu");
var $uploadBtn = $authenticationDiv.find("button#upload");

//Bind events
channelImgDiv.on("click", toggleMenu);

function toggleMenu(){
    
    var $this = $(this);
    
    //show the user menu and place it below the user image
    $userMenu.toggle();
    $this.append($userMenu);
    
    //Set up user menu if visible
    if($userMenu.is(":visible")){
        var topMargin;
        var leftMargin;
        
        $this.css("overflow", "visible");
        
        //Set margins based on window size (responsive)
        if (window.innerWidth > 767){
            topMargin  = "45px"
            leftMargin = "-105px";
        } else {
            topMargin = "35px"
            leftMargin = "-115px";
        }
        
        //Menu CSS
        $userMenu.css({
            "position": "absolute",
            "top": topMargin,
            "left": leftMargin
        }) 
    }
}

$uploadBtn.on("click", function(){
    window.location.href = "https://mini-youtube.herokuapp.com/video/new";
})
