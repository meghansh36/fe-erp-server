module.exports = class DefaultForm {

    constructor(){
		this._code = this.getFormCode();
        this._helperObject;
        this._serviceObject;
        this._setServieObject();
        this._setHelperObject();
    }

    _setHelperObject(){
        const defaultHelperClass = require(FE.FORMS_PATH+'/helpers/'+this._code);
        let defaultHelperObject = new defaultHelperClass();
        this._helperObject = defaultHelperObject;
    };

    _setServieObject(){
        const defaultServiceClass = require(FE.FORMS_PATH+'/services/'+this._code);
        let defaultServiceObject = new defaultServiceClass();
        this._serviceObject = defaultServiceObject;
    };

	save( req, res ){

	}

	getFormCode() {
		return '';
	}
}
