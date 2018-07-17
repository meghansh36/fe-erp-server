const aureole_lookup = require('@L1/controllers/aureole_lookup.js');

var express = require('express');
var router = express.Router();


router.get('/', aureole_lookup.findAll);


module.exports = router;