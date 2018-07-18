const session = require('express-session');
module.exports = function(subAppObj){
    return subAppObj.use(session(subAppObj.configs.session));
}