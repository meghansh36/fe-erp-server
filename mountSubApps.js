const app = require('./app.js')
//const app = express();
const vhost = require('vhost');
Object.defineProperty(global, '_', {value: require('lodash')}) // import lodash globally
var config = require("./fe-server/config/fe.config.host.json");
var clientSessionConfig = {};
var sessionConfig = {};
config = config['clients'];

for(const host in config) {
    const hostDetails = config[host]
    //console.log(hostDetails);
    hostPath = hostDetails['appPath'];
    vhostName = hostDetails['vhost'];
    configPath = hostDetails['config'];
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
        clientSessionConfig = require(hostDetails['session'])
    }
    
    if(_.isEmpty(clientSessionConfig)){
        sessionConfig = FE.config.sessionConfig;
    }
    sessionConfig = _.assign({},FE.config.sessionConfig,clientSessionConfig);
    const subAppObj = require(hostPath);
    app.load(subAppObj);
    app.use(vhost(vhostName,subAppObj));
}




