//var path = require('path');


var express = require('express');
var router = express.Router();

//router.get('/:id',fe_hrm_emp_info_t_obj.empDetails);
router.use('/',require('@L1Modules/default/routes/fe_hrt_emp_info_t.js'));

module.exports = router;