const DefaultAction = require('./defaultAction');

module.exports = class searchDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["post"];
    }
}