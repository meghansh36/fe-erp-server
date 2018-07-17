//var path = require('path');
const FeEmpDetails = require('@L1Process/default/controllers/fe_hrt_emp_info_t.js');
//console.log(path.join(process.env.L1Process,'default/controllers/fe_hrm_emp_info_t.js'));

module.exports = class LgEmpDetails extends FeEmpDetails{
    constructor(){
        super();
    }
 }
