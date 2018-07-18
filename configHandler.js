var dbConfiguration = require('./fe-server/config/config.js');
var sessionConfiguration = require('./fe-server/config/session.js');

if(!global.FE.config) {
    global.FE = {
        config :{}
    };    
}
//FE.config[host][details] =   hostDetails[details];
//clientSessionConfig = require(hostDetails['session'])


FE.config.sessionConfig = sessionConfiguration;
FE.config.dbConfig = dbConfiguration;