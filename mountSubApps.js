const app = require('./app.js')
//const app = express();
const vhost = require('vhost');
Object.defineProperty(global, '_', {value: require('lodash')}) // import lodash globally
var config = require("./fe-server/config/fe.config.host.js");
var clientSessionConfig = {};
var sessionConfig = {};
const fs = require('fs');

for(const host in config) {
    const hostDetails = config[host]
    //console.log(hostDetails);
    hostPath = hostDetails['appPath'];
    vhostName = hostDetails['vhost'];
    configPath = hostDetails['config'];

    fs.readdirSync(configPath).forEach(file => {
    console.log(file);
    })



    for(const details in hostDetails )
    {   
        if(!global.FE) {
            global.FE = {
                clients :{}
            };    
        }
        if(!FE.clients[host]){
            FE.clients[host] = {};
        }
        FE.clients[host][details] =   hostDetails[details];
        console.log('asdadadsa',hostDetails['session']);
        clientSessionConfig = require(hostDetails['session']);
    }
    
    if(_.isEmpty(clientSessionConfig)){
        sessionConfig = FE.config.sessionConfig;
    }
    sessionConfig = _.assign({},FE.config.sessionConfig,clientSessionConfig);
    const subAppObj = require(hostPath);
    //app.use(subAppObj);
    loadSession(subAppObj,sessionConfig);
    app.use(vhost(vhostName,subAppObj));
}

// loadSubApp(subApp) {
//     loadConfigs(subApp);
//     loadSession(subApp);
// }

// loadConfigs(subApp) {

// }


loadSession = function(subAppObj){
    var sessionMiddleWare = require('./fe-server/lib/session.js');
    sessionMiddleWare(subAppObj);
}






