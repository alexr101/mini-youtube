//Scroll the page down if the url has a scroll parameter

$(document).ready(function(){
    
    //Get URL parameter by its name
    //Credit: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    function getParameterByName(name, url) {
        
        if (!url) {
          url = window.location.href;
        }
        
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
            
        if (!results) 
            return null;
        if (!results[2]) 
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    //Without this a millisecond timeout the call won't work
    setTimeout(function() {
        
        //Amount of pixels to scroll the page
        var scrollAmount = getParameterByName('scroll');
        
        if(scrollAmount){
            $(window).scrollTop(scrollAmount); 
        }
        
    }, 1);
});
