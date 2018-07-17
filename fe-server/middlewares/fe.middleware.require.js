global.requireL1 = function(path) {
    var L1PathPrefix = __dirname + '../';
    return require(L1PathPrefix + path);
}

global.requireL2 = function(path,req) {
var L2PathPrefix = __dirname + '/../legislations/fe';
    return require(L2PathPrefix + path);
}

global.requireL3 = function(path,req) {
    var clientName = req.params.client;
    var legislationName = global.legislation[clientName];
    //var moduleName = req.params.module;
    var L3Path = '../legislations/'+legislationName+'/clients/'+clientName+'/main/'+path;
    return require(L3Path);
}


// requireFunction =  function(path,req){
//     req.pathConfig
// }