class DefaultForm{
    constructor(){
        this._code = '';
        this._helperObject;
        this._serviceObject;
        this._setServieObject();
        this._setHelperObject();
    }

    _setHelperObject(){
        const defaultHelperClass = require('./defaultFormHelper');
        let defaultHelperObject = new defaultHelperClass();
        this._helperObject = defaultHelperObject;
    };

    _setServieObject(){
        const defaultServiceClass = require('./defaultFormService');
        let defaultServiceObject = new defaultServiceClass();
        this._serviceObject = defaultServiceObject;
    };

	save(){

	}
}
