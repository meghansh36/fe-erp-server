const DefaultAction = require('./defaultAction');
const path = require('path');

module.exports = class UpdateDefaultAction extends DefaultAction {
    getAccepts() {
		return [ "PATCH", "PUT" ];
	}

	handlePATCHRequest( req, res, done ) {
		this.handleAction(req, res, done, 'update');
	}

	handlePUTRequest( req, res, done ) {
		this.handleAction(req, res, done, 'update');
	}

    handleAction(req,res,done, method) {
		// TODO  check multiple forms codes and save handle them accordingly
        var action = req.params.action;
		var formClassPath = path.join( FE.FORMS_PATH, 'forms' , req.body.data.formCode+'.js');
        const formClass = require(formClassPath);
        const formClassObject =  new formClass();
        formClassObject[method](req,res);
    }
}
