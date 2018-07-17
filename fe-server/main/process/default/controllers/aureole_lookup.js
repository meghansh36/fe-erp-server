//var index = require('../models');
//var models = require('../models');
var path = require('path');
var models = require('@L3Root/fe/main/process/default/models');
//var aureole_lookup = models.aureole_lookup;

function findAll(req, res, done){
    models.AureoleLookup.findAll({ limit: 10 })
    .then(lookups => {
	  res.send(lookups);
	});
};
exports.findAll = findAll;


