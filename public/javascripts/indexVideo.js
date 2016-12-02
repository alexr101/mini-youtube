//Index Video thumbnail setup

//Cache Elements
var $container = $(".container");
var $videoImageContainers = $container.find(".index-video-image");
var $videoImages = $container.find(".video-img");

//set video container height to accoutn for absolute positioned description divs at the bottom
var videoContainerHeight = $videoImages.height() * .5;
$videoImageContainers.css("height", "170px");