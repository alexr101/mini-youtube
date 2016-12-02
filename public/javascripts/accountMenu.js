var $menuContainer = $("#account-side-menu");
var $menuHeader = $menuContainer.find("h3");
var $menu = $menuContainer.find("ul");
var $downArrow = $menuContainer.find("span");

//Set the event listener for the menu based on window size
$(window).resize(function() {
    setMenuClick();
});

//Set click listener based on whether the down arrow is visible
//This down arrow is toggle by window size (responsive)
function setMenuClick(){
    if( $downArrow.is(":visible")){
        //Turn off the click before turning it on. This prevent duplicate event handlers
        $menuHeader.off("click", toggleMenu);
        $menuHeader.on("click", toggleMenu);
    } else {
        $menuHeader.off("click");
    }
}

//Check screen size on window load
setMenuClick();

//Shows or hides the account menu
function toggleMenu(){
    
    if($menu.is(":visible")){
        $downArrow.rotate(0);
        $menu.hide();
    } else {
        $downArrow.rotate(180);
        $menu.show();
    }
}