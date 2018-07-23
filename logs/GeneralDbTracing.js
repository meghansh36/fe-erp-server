var mysql = require('mysql');
const levels = { 
  error: 0, 
  warn: 1, 
  info: 2, 
  verbose: 3, 
  debug: 4, 
  silly: 5 
};
var con = mysql.createConnection({
    host: "dev-mumbai.cyvlbltrfdzs.ap-south-1.rds.amazonaws.com",
    user: "shubham.kumar",
    password: "R2wk@MU}3N",

database:'dev'
  });
  
  con.connect(function(err) {
    console.log('connected')
  });

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
                    + currentdate.getFullYear() +" "+
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    
    
                   // console.log(message,description,level,staging,datetime);
  var  code=levels[level];
 
  con.query("INSERT INTO fe_sys_debugger_log_t ( attribute2, attribute3, attribute4, attribute5, attribute6, attribute7,attribute8, attribute9, attribute10, attribute11, attribute12, attribute13,attribute21 ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",["1","2","3","ERROR",code,level,message,"9",err.stack,11,index,line,datetime], function (err, result) {
    if (err) throw err;
 
  });   
}
                 
   
  
  
  
}   
   
module.exports=logging;