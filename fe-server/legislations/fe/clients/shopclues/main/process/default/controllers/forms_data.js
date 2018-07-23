//var path = require('path');
const LgFormsData = FE.require(FE.SERVER_APP_PATH+'/legislations/fe/main/process/default/controllers/forms_data.js');
//console.log(path.join(process.env.L1Process,'default/controllers/fe_hrm_emp_info_t.js'));

module.exports = class FormsData extends LgFormsData{
    constructor(){
        super();
    }
 }
