var fs        = FE.require('fs');
var path      = FE.require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
const appConfigs = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .map(function (file) {
    const configObj = require(path.join(__dirname, file));
    var fileName = file.split(/[\\/]/).pop();
    var configName = path.basename(fileName, path.extname(fileName));
    if(typeof FE.configs.helpers[configName] != "undefined") {
      configObj = Object.assign({}, FE.configs.helpers[configName], configObj);
    }
    return {
        [configName] : configObj
    };
  })
);
module.exports = appConfigs;