const app = require('./app.js')
//const app = express();
const vhost = require('vhost');
Object.defineProperty(global, '_', {value: require('lodash')}) // import lodash globally
var config = require("./fe-server/config/fe.config.host.json");

config = config['clients'];

for (const host in config) {
    const hostDetails = config[host]
    console.log(hostDetails);
    hostPath = hostDetails['appPath'];
    vhostName = hostDetails['vhost'];
    app.use(vhost(vhostName,require(hostPath)));
}


