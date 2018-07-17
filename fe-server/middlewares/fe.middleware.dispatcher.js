//import dependencies

var router = require('express').Router({mergeParams: true});
router.get('/:module/:controller/:action',(req, res, next) => {
    console.log(req.params);
    var controller = "../legislations/fe/clients/"+req.params.client+"/main/process/"+req.params.module+"/controllers/"+req.params.controller+'.js';
    var controller_class = require(controller);
    console.log(controller_class);
    var controllerObj = new controller_class();
    console.log(controllerObj);
    var action = req.params.action;
   // var jsonToBeSent = controllerObj[action](req,res);
     //console.log(jsonToBeSent);
     //res.send(JSON.stringify(controllerObj[action](req,res)));
     controllerObj[action](req,res);
});

router.post('/:module/:controller/:action',(req, res, next) => {
  console.log(req.params);
  var controller = "../legislations/fe/clients/"+req.params.client+"/main/process/"+req.params.module+"/controllers/"+req.params.controller+'.js';
  var controller_class = require(controller);
  console.log(controller_class);
  var controllerObj = new controller_class();
  console.log(controllerObj);
  var action = req.params.action;
 // var jsonToBeSent = controllerObj[action](req,res);
   //console.log(jsonToBeSent);
   //res.send(JSON.stringify(controllerObj[action](req,res)));
   controllerObj[action](req,res);
});

module.exports = router;