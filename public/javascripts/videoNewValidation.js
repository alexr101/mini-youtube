//Validation for new videos

//Cache elements
var $form = $("#new-video-form");
var $sourceInput = $form.find("#source");
var $categorySelect = $form.find("#category");

//Validation 
$form.on("submit", function(e){
    var validate = true;
    var errorMsg = "Correct the following errors: <br>";

    if($sourceInput.val() == ""){
        errorMsg += "Please paste a link from youtube video"
        validate = false;
    }
    
    if(!$sourceInput.val().includes("youtube")){
        errorMsg += "Please paste a link from youtube video"
        validate = false;
    }
    
    if($categorySelect.val() == ""){
        errorMsg += "Select a category...please?  <br>"
        validate = false;
    }
    
    
    if(validate == false){
        $("p#error").show().html(errorMsg);
        e.preventDefault();
    }
    
});