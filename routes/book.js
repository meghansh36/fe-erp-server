var express = require("express");
var router = express.Router();

router.get('/', function(req,res,next){
	console.log(new Date());
	res.send("hello");
})

router.get('/:id', function(req,res,next){
	//res.send(req.params.id)
	res.sendFile("index.html", {root: './dist/'+req.params.id})
})

module.exports = router
