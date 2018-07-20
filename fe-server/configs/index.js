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
    const configObj = require(path.join(__dirname, file));
    var configName = file.slice(0,-3);
    return {
        [configName] : configObj
    };
  })
);
module.exports = appConfigs;