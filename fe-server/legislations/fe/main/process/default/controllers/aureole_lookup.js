//var index = require('../models');
var models = require('../models');
//var aureole_lookup = models.aureole_lookup;

function findAll(req, res, done){
    models.aureole_lookup.findAll({ limit: 10 })
    .then(lookups => {
	  res.send(lookups);
	});
};

exports.findAll = findAll;


