const DefaultAction = require('./defaultAction');

module.exports = class populateDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["get"];
    }
}