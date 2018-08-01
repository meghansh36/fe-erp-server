const DefaultAction = require('./defaultAction');
const path = require('path');

module.exports = class SaveDefaultAction extends DefaultAction {

	getAccepts() {
		return [ "PUT" ];
	}

    handlePUTRequest(req,res,done) {
		// TODO  check multiple forms codes and save handle them accordingly
		var formClassPath = path.join( FE.FORMS_PATH, 'forms' , req.body.data.formCode+'.js');
        const formClass = require(formClassPath);
        const formClassObject =  new formClass();
        formClassObject.save(req,res);
    }
}
