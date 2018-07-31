const DefaultAction = require('./defaultAction');

module.exports = class PopulateDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["get"];
    }
}
