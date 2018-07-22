// // const { createLogger, transports } = require('winston');

// // // Enable exception handling when you create your logger.
// // const logger = createLogger({
// //     level:'error'
// // });


// // // Call exceptions.handle with a transport to handle exceptions
// // logger.exceptions.handle(
// //   new transports.File({ filename: 'exceptions.log' }))



// // function t()
// // {
// //     try {
// //         console.log(l);
        
// //     } catch (error) {
// //         console.log(error);
// //         logger.log(error)
        
// //     }
// // }
// // t();
// let winston = require('winston');

// const myFormat = winston.format.printf(info => {

//    t ='{'+'"TimeStamp"'+':'+'"'+info['timestamp']+'"'+','+'"Level"'+':'+'"'+info['level']+'"'+','+'"Error"'+':'+'"'+info['error']+'"'+','+'"Line"'+':'+'"'+info['message'][0]['line']+'"'+','+'"File"'+':'+info['message'][0]['file']+'}'+',';
//    return t
// });

// const logger = winston.createLogger({
//     level: 'error',
//     format: winston.format.combine(winston.format.timestamp(), myFormat),  // winston.format.json(),
   
//     exceptionHandlers: [
//         new winston.transports.File({ filename: __dirname+'exceptions.log' }),
        
//          ],
// exitOnError:false});


// //     logger.add(new winston.transports.Console({

// //         format: winston.format.combine(winston.format.timestamp(), myFormat),
// //         level: 'error',
        
// //     exceptionHandlers: [
// //         new winston.transports.File({ filename: __dirname+'exceptions.log' }),
        
// //          ],
// //         handleExceptions: true
// //     })
    
// // );



// module.exports=logger
const winston = require('winston');
// const { combine, timestamp, label, prettyPrint ,format} = winston.format;
require('winston-daily-rotate-file');


//creating 
var transport = new (winston.transports.DailyRotateFile)({
  dirname:'../../logs/Exceptions',
  filename: "Exception"+'%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  level:'info',
  timestamp:true,
  prettyPrint:true,


});

transport.on('rotate', function(oldFilename, newFilename) {
 console.log(oldFilename,newFilename);
});

const logger = winston.createLogger({
    transports: [transport],  
    
   exitOnError: false

})
class logging
{


 logging(message,description,staging){
  
var err = new Error();

var caller_line = err.stack.split("\n")[2];
  var index = caller_line.indexOf("at ");
  var index= caller_line.slice(index+22, caller_line.length);
  var line =index.match(/:[0-9]+:/).toLocaleString();
  line=line.replace(/[^0-9]/g, '');
  var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  logger.log({
    'level': 'error',
    'stack':message[0]['stack'],
    'message': String(message[0]['error'])
    ,'file':index,'line':line,'description':description,'stage':staging,'TIMESTAMP':datetime

  
  
  });
 
}
}









module.exports=logging;