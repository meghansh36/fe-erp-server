
let pluginConfig = {
    plugins    : {
        "session"   : true,
        "passport"  : true,
        "acl"       : true,
    },
    order    : [
        "session",
        "passport",
        "acl"
    ]
};
module.exports = pluginConfig;
