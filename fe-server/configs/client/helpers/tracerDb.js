function configLoader(appObj) {
    let traceDbConfigs = {
        table_name: 'SystemDebuggerLogModel',
        
        logsFolder: FE.APP_PATH + '/logs/app/trace',
        filenameConvention: "Exception"+'%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        level: 'info',
        timestamp:true,
        prettyPrint:true,

        type: 'EXCEPTION'
    };
    return traceDbConfigs;
}
module.exports = configLoader;
