var fs = require('fs');
var path = require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
function configLoader(appObj) {
	const appGlobals = Object.assign({}, ...fs.readdirSync(__dirname)
		.filter(file =>
			(file.indexOf(".") !== 0) && (file !== "index.js")
		)
		.map(function (file) {
			const subConfigLoader = require(path.join(__dirname, file));
			const globalObj = subConfigLoader(appObj);
			return globalObj;
		})
	);
	return appGlobals;
}
module.exports = configLoader;
