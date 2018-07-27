function configLoader(appObj) {
    let dbLoggerConfigs = {
        table_name: 'SystemDebuggerLogModel',
        
        logsFolder: FE.APP_PATH + '/logs/app/exceptions',
        filenameConvention: "Exception"+'%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        level:'info',
        timestamp:true,
        prettyPrint:true,
        
        //user_name: 'manjeet',
        type: 'EXCEPTION'
    };
    return dbLoggerConfigs;
}
module.exports = configLoader;