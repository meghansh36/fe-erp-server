const DefaultAction = require('./defaultAction');

module.exports = class SaveDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["put"];

        this._error = '';
        this._errorCode = '';
        this._message = '';
        this._messageCode = '';
        this._data = '';
        this._html = '';

        super(this.accepts);
    }

    handlePutRequest(req,res,done) {
        // TODO  find form code from the
        var action = req.params.action;
        var formClassPath = FORMS_PATH + '/' + req.data.formCode;
        const formClass = require(formClassPath);
        const formClassObject =  new formClass();
        formClassObject[action](req,res);
        var successMessage = '';//Save My Data
        // creatingDataStructure();

        if(!successMessage) {
            this._error = 'My Data was not saved';
            this._errorCode = 'ERR000001';
        } else {
            this._message = 'My data was saved successfully';
            this._messageCode = 'MSG00001';
            this._data = {id: 56};
        }
    }


}
