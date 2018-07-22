let traceConfigs = {
    dirname:'../../logs/Exceptions',
    filename: "Exception"+'%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    level:'info',
    timestamp:true,
    prettyPrint:true,
};
module.exports = traceConfigs;