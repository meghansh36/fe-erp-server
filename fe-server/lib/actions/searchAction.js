const DefaultAction = require('./defaultAction');

module.exports = class SearchDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["post"];
    }
}
