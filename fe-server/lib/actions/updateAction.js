const DefaultAction = require('./defaultAction');

module.exports = class UpdateDefaultAction extends DefaultAction {
    constructor() {
        this.accepts = ["patch,put"];
    }
}
