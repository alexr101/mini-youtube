var fs = require("fs")

module.exports = {

    //Used to remove urls parameters from address
    //key = parameters you want removed (include \?)
    //credit "http://stackoverflow.com/questions/16941104/remove-a-parameter-to-the-url-with-javascript/16941921"
    removeParam: function(key, sourceURL) {
        var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    },
    
    //Converts time to hour:minute:seconds duration
    //credit: http://stackoverflow.com/questions/22148885/converting-youtube-data-api-v3-video-duration-format-to-seconds-in-javascript-no/25778214
    convert_time : function(duration) {
	    var a = duration.match(/\d+/g);
	
	    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
	        a = [0, a[0], 0];
	    }
	
	    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
	        a = [a[0], 0, a[1]];
	    }
	    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
	        a = [a[0], 0, 0];
	    }
	
	    duration = 0;
	
	    if (a.length == 3) {
	        duration = duration + parseInt(a[0]) * 3600;
	        duration = duration + parseInt(a[1]) * 60;
	        duration = duration + parseInt(a[2]);
	    }
	
	    if (a.length == 2) {
	        duration = duration + parseInt(a[0]) * 60;
	        duration = duration + parseInt(a[1]);
	    }
	
	    if (a.length == 1) {
	        duration = duration + parseInt(a[0]);
	    }
	    var h = Math.floor(duration / 3600);
	    var m = Math.floor(duration % 3600 / 60);
	    var s = Math.floor(duration % 3600 % 60);
	    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
	},
    
    //Determines the amount of pixels to scroll a page after
    //comment authentication or writing a new comment
    commentScrollAmount: function(deviceType){
    	if(deviceType !== "tablet" || deviceType !== "phone"){
    		return 760;
    	} else {
    		return 595;
    	}
    },
    
    //Remove image from Amazon S3 database
    removeS3Image: function(filePath, client, imageKey){
		var deleteParams = {
			Bucket: 'mini-tube-images', /* required */
			Delete: { Objects: 
					[ {
						Key: imageKey, /* required */
					}, ], 
			},
		};
		
		client.deleteObjects(deleteParams, function(err, data) {
			if (err) 
				console.log(err, err.stack); // an error occurred
	    	console.log("deleted image");           // successful response
		});
	}
                                
};

