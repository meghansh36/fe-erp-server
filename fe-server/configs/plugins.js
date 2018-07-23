
let pluginConfig = {
    plugins    : {
        "session"   : true,
        "auth"      : true,
        "db"        : true,
        "acl"       : true,
    },
    order    : [
        "session",
        "auth",
        "db",
        "acl"
    ]
};
module.exports = pluginConfig;
