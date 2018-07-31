const DefaultAction = require('./defaultAction');

module.exports = class DeleteDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["post"];
    }
}
