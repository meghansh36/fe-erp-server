const DefaultAction = require('./defaultAction');

module.exports = class updateDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["patch,put"];
    }
}