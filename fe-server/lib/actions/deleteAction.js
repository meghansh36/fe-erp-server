const DefaultAction = require('./defaultAction');

module.exports = class deleteDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["post"];
    }
}