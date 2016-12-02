var express = require('express');
var router = express.Router();

router.route('/:id')
	.get(function(req, res){
		res.send("TODO: search results");
		//res.render("search-results");
	});

module.exports = router;