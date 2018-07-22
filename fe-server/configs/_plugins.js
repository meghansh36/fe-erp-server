
let pluginConfig = {
    plugins    : {
        "session"       : true,
        "db"            : true,
        "auth"      : true,
        "acl"           : true,
        "dispatcher"    : true
    },
    order    : [
        "session",
        "db",
        "auth",
        "acl",
        "dispatcher"
    ]
};
module.exports = pluginConfig;
