const app = require('./app.js')
//const app = express();
const vhost = require('vhost');
Object.defineProperty(global, '_', {value: require('lodash')}) // import lodash globally
var config = require("./fe-server/config/fe.config.host.js");
var sessionConfig = {};
const fs = require('fs');

loadSession = function(host,subAppObj){
    var clientSessionConfig = require(FE.clients[host]['session']);
     if(_.isEmpty(FE.clients[host]['session'])){
         sessionConfig = global.FE.config.sessionConfig;
     }else{
         sessionConfig = _.assign({},FE.config.sessionConfig,clientSessionConfig);
     }
     var sessionMiddleWare = require('./fe-server/lib/session.js');
     sessionMiddleWare(subAppObj,sessionConfig);
 }


loadSubApp = function(host,subAppObj){
    loadSession(host,subAppObj);
}
// console.log(config);
// console.log("-------------");
for(let host in config) {
    const hostDetails = config[host]
    //console.log(hostDetails);
    hostPath = hostDetails['appPath'];
    vhostName = hostDetails['vhost'];
    configPath = hostDetails['config'];
    fs.readdirSync(configPath).forEach(file => {
    file = file.slice(0,-3);
    if(!global.FE.clients) {
        FE = _.assign(FE,{
            'clients' :{}
        })  
    }
    if(!FE['clients'][host]){
        FE.clients =_.assign(FE.clients,{
            [host] :{}
        })
    }
    FE.clients[host][file] = configPath+file+'.js';
    })
    // for(const details in hostDetails )
    // {   
    //     FE.clients[host][details] =   hostDetails[details];
    //     console.log('asdadadsa',hostDetails['session']);
    //     clientSessionConfig = require(hostDetails['session']);
    // // }
    
    // if(_.isEmpty(FE.clients[host]['session'])){
    //     sessionConfig = global.FE.config.sessionConfig;
    // }else{
    //     sessionConfig = _.assign({},FE.config.sessionConfig,clientSessionConfig);
    // }
    
    let subAppObj = require(hostPath);
    loadSubApp(host,subAppObj);
    // loadSession(host,subAppObj);
    app.use(subAppObj);
    //loadSubApp(subAppObj,sessionConfig);
    app.use(vhost(vhostName,subAppObj));
}

// loadSubApp(subApp) {
//     loadConfigs(subApp);
//     loadSession(subApp);
// }

// loadConfigs(subApp) {

// }

// console.log(FE);
// console.log(sessionConfig);
//console.log('NEW');
// loadSession = function(host,subAppObj){
//    var clientSessionConfig = require(FE.clients[host]['session']);
//     if(_.isEmpty(FE.clients[host]['session'])){
//         sessionConfig = global.FE.config.sessionConfig;
//     }else{
//         sessionConfig = _.assign({},FE.config.sessionConfig,clientSessionConfig);
//     }
//     var sessionMiddleWare = require('./fe-server/lib/session.js');
//     sessionMiddleWare(subAppObj);
// }






