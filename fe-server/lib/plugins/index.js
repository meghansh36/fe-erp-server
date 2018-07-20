var fs        = require('fs');
var path      = require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
const pluginsClasses = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .map(function (file) {
    const pluginClass = require(path.join(__dirname, file));
    //var pluginName = file.slice(0,-3);
    var pluginName = file;
    return {
        [pluginName] : pluginClass
    };
  })
);
module.exports = pluginsClasses;