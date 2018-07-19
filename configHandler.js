var dbConfiguration = require('./fe-server/config/config.js');
var sessionConfiguration = require('./fe-server/config/session.js');


if(!global.FE) {
    global.FE ={config :{}};    
}
FE.config.sessionConfig = sessionConfiguration;
FE.config.dbConfig = dbConfiguration;