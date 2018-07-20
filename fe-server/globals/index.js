var fs        = require('fs');
var path      = require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
const appGlobals = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file =>
    (file.indexOf(".") !== 0) && (file !== "index.js")
  )
  .map(function (file) {
    const globalObj = require(path.join(__dirname, file));
    return globalObj;
  })
);

Object.assign(global, appGlobals);
module.exports = appGlobals;