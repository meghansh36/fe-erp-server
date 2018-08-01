const path = require('path');
const DefaultForm = require(path.join(FE.LIBRARY_PATH, 'main/form/defaultForm.js'));

module.exports = class FormBuilder extends DefaultForm {

	getFormCode() {
		return 'formBuilder';
	}

	save( req, res )  {
		res.json(req.body);
		//res.send("Hello World from save FormBuilder.");
	}

	update( req, res ) {
		res.json(req.body);
	}
}
