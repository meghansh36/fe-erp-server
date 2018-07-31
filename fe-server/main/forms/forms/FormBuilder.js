const path = require('path');
const DefaultForm = require(path.join(FE.LIBRARY_PATH, 'main/form/defaultForm.js'));

module.exports = class FormBuilder extends DefaultForm {

	getFormCode() {
		return 'formBuilder';
	}

	save( req, res )  {
		res.send("Hello World from FormBuilder.");
	}

	_saveFRM() {

	}
}
