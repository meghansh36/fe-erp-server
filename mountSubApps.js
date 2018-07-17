const app = require('./app.js')
//const app = express();
const vhost = require('vhost');
Object.defineProperty(global, '_', {value: require('lodash')}) // import lodash globally
var config = require("./fe-server/config/fe.config.host.json");

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
    }
    app.use(vhost(vhostName,require(hostPath)));
}


