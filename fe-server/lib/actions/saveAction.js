const DefaultAction = require('./defaultAction');
const path = require('path');

module.exports = class SaveDefaultAction extends DefaultAction {

	getAccepts() {
		return [ "PUT" ];
	}

    handlePutRequest(req,res,done) {
		// TODO  check multiple forms codes and save handle them accordingly
		console.log("handlePutRequest");
        var action = req.params.action;
		var formClassPath = path.join( FE.FORMS_PATH, 'forms' , req.body.data.formCode+'.js');
		console.log('formClassPath');
        const formClass = require(formClassPath);
        const formClassObject =  new formClass();
        formClassObject[action](req,res);
        //var successMessage = '';//Save My Data
        // creatingDataStructure();
/*
        if(!successMessage) {
            this._error = 'My Data was not saved';
            this._errorCode = 'ERR000001';
        } else {
            this._message = 'My data was saved successfully';
            this._messageCode = 'MSG00001';
            this._data = {id: 56};
        } */
    }


}
