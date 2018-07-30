function loader(appObj) {
    const clients = {
        "fe" :{
            "client"        : "fe",
            "legislation"   : "fe",
            "app"           : FE.SERVER_APP_PATH + "/legislations/fe/clients/fe/index.js",
            "domain"        : "127.0.0.1",
            "configsPath"    : FE.SERVER_APP_PATH + "/legislations/fe/clients/fe/configs/index.js",
            "utilsPath"    : FE.SERVER_APP_PATH + "/legislations/fe/clients/fe/utils/index.js",
            "globalsPath"    : FE.SERVER_APP_PATH + "/legislations/fe/clients/fe/globals/index.js",
        }
    };
    return clients;
}
module.exports = loader;
