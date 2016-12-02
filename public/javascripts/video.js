//Main video setup on video-show page

//Cache Elements
var infoSection = document.getElementById("info");
var descriptionBtn = $(infoSection).find("#description-btn")[0];
var descriptionDiv = $(infoSection).find(".description-container");
var favoriteBtn = $(infoSection).find("#fave-button");

//Bind elements
$(descriptionBtn).on("click", toggleDescription);
$(favoriteBtn).on("click", addToFavorites);

//Functions 

//show or hide description if you press the show button
function toggleDescription(){
	$(descriptionDiv).toggleClass("description-closed", 300, "swing");

    if($(descriptionDiv).hasClass("description-closed")){
       $(descriptionBtn).html("Show"); 
    } else {
        $(descriptionBtn).html("Hide"); 
    }
}

//Send API call to try to add video to favorites
function addToFavorites(){
    
    var url = window.location.href.replace("video", "user/favoriteVideo/add");

    function httpGetAsync(theUrl, callback) {
        
        var xmlHttp = new XMLHttpRequest();
        
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                 callback(xmlHttp.responseText);
        }
        
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    
    //Callback function
    httpGetAsync(url, function(response){
        alert(response);
    });
}

//Add commas to any number
//Credit: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
