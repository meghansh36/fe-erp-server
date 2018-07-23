var fs = require('fs');
var path = require('path');

/**
 * @description : Use all files in globals folder and attach each variable in globals.
 */
function configLoader(subAppObj) {
	const pluginClasses = Object.assign({}, ...fs.readdirSync(__dirname)
		.filter(file =>
			(file.indexOf(".") !== 0) && (file !== "index.js")
		)
		.map(function (file) {
			const pluginClass = require(path.join(__dirname, file));
			var fileName = file.split(/[\\/]/).pop();
			var pluginName = path.basename(fileName, path.extname(fileName));
			return {
				[pluginName]: pluginClass
			};
		})
	);
	return pluginClasses;
}

module.exports = configLoader;
