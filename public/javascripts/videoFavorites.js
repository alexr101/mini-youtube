//Remove video from favorites from the account page

//Cache Elements
var removeButtons = document.getElementsByClassName("btn-remove-video");

//Bind all buttons
[].forEach.call(removeButtons, function(button){
    $(button).on("click", removeFromFavorites);
})

//Functions

//Send API call to try to remove video from favorites
function removeFromFavorites(){

    var url = "https://mini-youtube.herokuapp.com/user/favoriteVideo/remove/" + $(this).val();
    var params = "sourceUrl=" + window.location.href;
    
    function httpGetAsync(theUrl, callback){
        
        var xmlHttp = new XMLHttpRequest();
        
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        
        xmlHttp.open("POST", theUrl, true); //true async
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(params);
    }
    
    //Callback function
    httpGetAsync(url, function(response){
        window.location.replace(response);
    });

}