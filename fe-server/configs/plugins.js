
let pluginConfig = {
    plugins    : {
        "session"   : true,
        "auth"      : true,
        "acl"       : true,
    },
    order    : [
        "session",
        "auth",        
        "acl"
    ]
};
module.exports = pluginConfig;
