class FRM0000001 extends DefaultForm{

    constructor(){
        this._code = '';
        this._helperObject;
        this._serviceObject;
        this._setServieObject();
        this._setHelperObject();
    }

    _setHelperObject(){
        const helperClass = require('../helpers/FRM0000001');
        let helperObject = new helperClass();
        this._helperObject = helperObject;
    };

    _setServieObject(){
        const serviceClass = require('../services/FRM0000001');
        let serviceObject = new serviceClass();
        this._serviceObject = serviceObject;
    };

}
