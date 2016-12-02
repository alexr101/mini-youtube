//Input Switches for editing data
//These switches will toggle between plain text and input buttons to edit the data

//Cache elements
var $inputSwitchContainer = $(".input-switch-container");
var $inputBtns = $inputSwitchContainer.find("div.info-header button");
var $inputSwitches = $inputSwitchContainer.find(".input-switch");
var $inputs = $inputSwitchContainer.find("input");
var $selects = $inputSwitchContainer.find("select");
var $spans = $inputSwitchContainer.find("p span");
var $urlInput = $inputSwitchContainer.find(".url-input");
    $urlInput.val(window.location.href);

//Bind elements
$inputBtns.on("click", spanSwitchConversion);
$inputBtns.on("click", setupFormDisplay);
$inputBtns.on("click", updateButtonDisplays);
$inputs.on("click", highlightSelection);
$selects.on("click", highlightSelection)

//Functions

//Form display setup
function setupFormDisplay(){
    var $this = $(this);
    var $paragraph = $this.parent().siblings("form").find(".input-switch p");
    
    $paragraph.css("display", "block");
}

//Show or hide the input switches
function spanSwitchConversion(){
    var $this = $(this);
    var $inputSwitch = $this.parent().siblings("form").find(".input-switch");
    
    //Show or hide based on main button display of hide or cancel. This buttons changes this text every time you click it
    if($this.html() == "Edit"){
        $inputSwitch.find("input").show();
        $inputSwitch.find("select").show();
        $inputSwitch.find("p span").hide();
    } else {
        $inputSwitch.find("input").hide();
        $inputSwitch.find("select").hide();
        $inputSwitch.find("p span").show();
    }
}

//Change the text value of the main button to toggle the form
function updateButtonDisplays(){
    var $this = $(this);
    var $button = $this.parent().siblings("form").find(".update-btn");
    
    if($this.html() == "Edit"){
        $this.html("Cancel");
        $button.show();
    } else {
        $this.html("Edit");
        $button.hide();
    }
    
}

//Disable the inputs and display the paragraphs
function disableInputs(){
    var $this = $(this);
    
    $this.hide();
    $this.parent().find("p span").show();
}

//Highlight the selection in the inputs if you click on them
function highlightSelection(){
    var $this = $(this);

    $this.select();
}

//If you click the submit button send the edit request to the API
function sendEditRequest(){
    
    function httpGetAsync(theUrl, callback){
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("PUT", theUrl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(params);
    }
    
    var targetUrl = "https://mini-youtube.herokuapp.com/User/edit"
    var params = "sourceUrl=" + window.location.href;
    
    //Callback response after editing user    
    httpGetAsync(targetUrl, function(response){
        //refresh with the response url
        window.location.replace(response);
    })
}
