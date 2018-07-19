const session = require('express-session');
module.exports = function(subAppObj,clientSessionConfig){
    return subAppObj.use(session(clientSessionConfig));
}