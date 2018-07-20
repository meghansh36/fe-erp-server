const vhost = require('vhost');
const clientArr = FE.configs.clients;

FE.clients = {};
for(let clientName in clientArr) {
    const appPath = clientArr[clientName]['app'];
    const domainName = clientArr[clientName]['domain'];
    let clientObj = require(appPath);

    FE.clients[clientArr[clientName]['client']] = clientObj;
    //FE.loadClientApp(appObj);
    FE.app.use(vhost(domainName, clientObj.app));
}

console.log(FE.clients.fe.configs.db);