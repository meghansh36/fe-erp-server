
let pluginConfig = {
    plugins    : {
        "session"   : true,
        "passport"  : true,
        "db"        : true,
        "acl"       : true,
    },
    order    : [
        "session",
        "passport",
        "db",
        "acl"
    ]
};
module.exports = pluginConfig;
