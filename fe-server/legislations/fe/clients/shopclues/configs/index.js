var fs        = require('fs');
var path      = require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
const appConfigs = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .map(function (file) {
    let configObj = require(path.join(__dirname, file));
    let configName = file.slice(0,-3);

    if(typeof FE.configs[configName] != "undefined") {
      configObj = _.assign({}, FE.configs[configName], configObj);
    }    
    return {
        [configName] : configObj
    };
  })
);
module.exports = appConfigs;