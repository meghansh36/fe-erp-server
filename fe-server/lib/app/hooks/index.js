var fs = require('fs');
var path = require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
function configLoader(appObj) {
	const hookClasses = Object.assign({}, ...fs.readdirSync(__dirname)
		.filter(file =>
			(file.indexOf(".") !== 0) && (file !== "index.js")
		)
		.map(function (file) {
			const hookClass = require(path.join(__dirname, file));
			var fileName = file.split(/[\\/]/).pop();
			var hookName = path.basename(fileName, path.extname(fileName));
			return {
				[hookName]: hookClass
			};
		})
	);
	return hookClasses;
}

module.exports = configLoader;
