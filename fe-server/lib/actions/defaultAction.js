module.exports = class DefaultAction{

	constructor(){
		this._accepts = this.getAccepts();
		//this._appObj = FE.getClientApp(req);
		this._error = '';
        this._errorCode = '';
        this._message = '';
        this._messageCode = '';
        this._data = '';
        this._html = '';
    }

    initialize(req, res, next){
	   this._handleRequest(req, res, next);
    }

    _handleRequest(req, res, next) {

        if(!this._validateRequestType(req)) {
            console.log('INVALID REQUEST');
        } else {
            console.log('REQUEST VALIDATED');
        }
        this._preDispatch(req, res, next);

        this._dispatch(req, res, next);

        this._postDispatch(req, res, next);

    }

    _validateRequestType(req){
		var flag = false;
		this._accepts.forEach(requestType => {
           if(requestType == req.method){
			   flag = true;
               return false;
           }
		});
		return flag;
    }

    _dispatch(req, res, next) {
		console.log('req.type', req.type);
        if(req.method == 'PUT') {
            this._handlePutRequest(req, res, next);
        } else if(req.method == 'POST') {
            this._handlePostRequest(req, res, next);
        } else if(req.method == 'GET') {
            this._handleGetRequest(req, res, next);
        }
        this._sendResponse(req, res, next);
    }

    _preDispatch(req, res, next) {
        this.preDispatch(req, res, next);
    }

    preDispatch(req, res, next) {
        return true;
    }

    _postDispatch(req, res, next) {
        this.postDispatch(req, res, next);
    }

    postDispatch(req, res, next) {
        return true;
    }

    _handlePutRequest(req, res, next) {
		console.log("_handlePutRequest");
        this.handlePutRequest(req, res, next);
    }

    _sendResponse(req, res, next) {
        this.sendResponse(req, res, next);
    }

    _sendJsonResponse(req, res, next) {
        this.sendJsonResponse(req, res, next);
    }

    sendJsonResponse() {
        return JSON.stringify({
            err : this._error,
            errCode : this._errorCode,
            err : this._message,
            errCode : this._errorCode,
        });
    }

    _sendHtmlResponse(req, res, next) {
        this.sendHtmlResponse(req, res, next);
    }

    sendHtmlResponse() {
        return this._html;
    }

    sendResponse(req, res, next) {
        var response = undefined;
        if(req.contentType == 'aplication/json') {
            response = this._sendJsonResponse();
        } else if(req.contentType == 'aplication/html') {
            response = this._sendHtmlResponse();
        }
        res.send(response);
	}

	getAccepts() {
		return [];
	}
}
