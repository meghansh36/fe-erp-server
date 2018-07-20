module.exports = {
    require           : function(path) {
        return require(path);
    },
    requireL0           : function(path) {
        return require(FE.SERVER_APP_PATH + '/' + path);
    },
    requireL1           : function(path) {
        return require(FE.SERVER_APP_PATH + '/main/' + path);
    },
    requireL2           : function(path, req) {
        var legislation = req.params.legislation;
        var L2Path = FE.SERVER_APP_PATH + '/legislations/' + legislation + '/main/' + path;
        return require(L2Path);
    },
    requireL3           : function(path, req) {
        var client = req.params.client;
        var legislation = req.params.legislation;
        var L3Path = FE.SERVER_APP_PATH + '/legislations/' + legislation + '/clients/' + client + '/main/' + path;
        return require(L3Path);
    }
};