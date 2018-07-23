
let hooksConfig = {
    hooks    : {
        "logger"       : true,
        "tracer"       : true,
    },
    order    : [
        "logger",
        "tracer",
    ]
};
module.exports = hooksConfig;
