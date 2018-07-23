const winston = require('winston');
require('winston-daily-rotate-file');
//creating 
var transport = new (winston.transports.DailyRotateFile)({
  dirname:'../../logs/Error',
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  level:'info',
  timestamp:true,
  prettyPrint:true,


});

transport.on('rotate', function(oldFilename, newFilename) {
 //console.log(oldFilename,newFilename);
});

const logger = winston.createLogger({
    transports: [transport],   
   exitOnError: false

})
class logging{



 logging(message,description,level,staging){

var err = new Error();
  var caller_line = err.stack.split("\n")[2];
  var index = caller_line.indexOf("at ");
  var index= caller_line.slice(index+22, caller_line.length);
  var line =index.match(/:[0-9]+:/).toLocaleString();
  line=line.replace(/[^0-9]/g, '');
  var currentdate = new Date(); 
var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  logger.log({
    'level': level,
    'message': message,'file':index,'line':line,'description':description,'stage':staging,'TIMESTAMP':datetime


  
  });
 }



}





module.exports=logging;