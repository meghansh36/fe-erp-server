module.exports = class DefaultAction{

    constructor(accepts){
        this._accepts = accepts;
        err
        errcode
        msg
        msgcode
        data
        html
    }

    initialize(){
        _handlesRequest(req, res, next);
    }

    _handleRequest(req, res, next) {
        this._appObj = FE.getClientApp(req);

        if(!this._validateRequestType(req)) {
            res.send('INVALID REQUEST');
        } else {
            res.send('REQUEST VALIDATED');
        }
        this._preDispatch(req, res, next);

        this._dispatch(req, res, next);

        this._postDispatch(req, res, next);
        
    }

    _validateRequestType(req){
        this._accepts.forEach(requestType => {
           if(requestType == req.method){
               return true;
           }
        });
    }

    _preDispatch(req, res, next) {
        this.preDispatch(req, res, next);
    }

    _postDispatch(req, res, next) {
        this.postDispatch(req, res, next);
    }

    preDispatch(req, res, next) {
        return true;
    }

    postDispatch(req, res, next) {
        return true;
    }
    
    _dispatch(req, res, next) {
        if(req.type == 'PUT') {
            this._handlePutRequest();
        } else if(req.type == 'POST') {
            this._handlePostRequest();
        } else if(req.type == 'GET') {
            this._handleGetRequest();
        }

        this._sendResponse(req, res, next);
    }

    _handlePutRequest(req, res, mext) {
        this.handlePutRequest(req, res, mext);
    }

    _sendResponse(req, res, next) {
        this.sendResponse(req, res, mext);
    }

    _sendJsonResponse(req, res, next) {
        this.sendJsonResponse(req, res, mext);
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
        this.sendHtmlResponse(req, res, mext);
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
}