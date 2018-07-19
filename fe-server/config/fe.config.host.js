var clients = 
        {
            "fe" :{
                "appPath": "./fe-server/apps/fe.js",
                "vhost"  : "fe.localhost",
                "config":"./fe-server/legislations/fe/clients/fe/config/",
            },
            "shopclues" :{
                "appPath": "./fe-server/apps/shopclues.js",
                "vhost"  : "shopclues.localhost",
                "config":"./fe-server/legislations/fe/clients/shopclues/config/"
            }
        } ;

module.exports = clients;