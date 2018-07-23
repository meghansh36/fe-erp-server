function configLoader(appObj) {
    let traceConfigs = {
        logsFolder: FE.APP_PATH + '/logs/app/trace',
        filenameConvention: "Exception"+'%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        level:'info',
        timestamp:true,
        prettyPrint:true,
    };
    return traceConfigs;
}
module.exports = configLoader;
