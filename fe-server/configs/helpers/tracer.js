let traceConfigs = {
    logsFolder: FE.APP_PATH + '/logs/Trace',
    filenameConvention: "Exception"+'%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    level:'info',
    timestamp:true,
    prettyPrint:true,
};
module.exports = traceConfigs;