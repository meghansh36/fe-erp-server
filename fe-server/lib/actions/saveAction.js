const DefaultAction = require('./defaultAction');

module.exports = class saveDefaultAction extends DefaultAction {
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
        var sucessMessage = '';//Save My Data

        if(!sucessMessage) {
            this._error = 'My Data was not saved';
            this._errorCode = 'ERR000001';
        } else {
            this._message = 'My data was saved successfully';
            this._messageCode = 'MSG00001';
            this._data = {id: 56};
        }
    }

    
}