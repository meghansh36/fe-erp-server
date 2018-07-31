const path = require('path');
const DefaultFormHelper = require(path.join(FE.LIBRARY_PATH, 'main/form/defaultFormHelper.js'));


module.exports = class FormBuilderHelper extends DefaultFormHelper {}
