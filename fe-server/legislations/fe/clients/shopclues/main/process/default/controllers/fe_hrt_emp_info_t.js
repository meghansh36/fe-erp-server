const LgEmpDetails = FE.require(FE.SERVER_APP_PATH+'/legislations/fe/main/modules/default/controllers/fe_hrt_emp_info_t.js');

module.exports = class EmpDetails extends LgEmpDetails{
    constructor(){
        super();
    }
    testFunction(req,res,done){
        res.send('L3 FUNCTION WORKING');
    }

    // empDetails(req,res,done){
    //     return('L3 EMPDETAILS FUNCTION WORKING');
    // }
    
 }

