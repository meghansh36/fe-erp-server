module.exports = class FeEmpDetails{

    constructor(){ }
 
    //reading emplyee details frm all the tables.
    emp_details(req,res,done){
        var clientName = req.params.client;
        //var legislationName = global.legislation[clientName]; 
        //var legislationName = req.params.legislation;
        //var models = globals.requireL3('@L3Root/'+clientName+'/main/modules/default/models');
        var models = FE.clients[clientName].models;
        //var empId = req.params.id;
        models.EmpInfoModel.findAll({
            limit:10,
            subQuery: false,
            attributes: [['attribute11', 'Employee No'],['attribute4','Employee Name']],
        //     where: {
        //        attribute1: empId
        //    },
           required: true,
            include:
            [
                {           
                    model: models.EmpJobModel,
                    attributes:['attribute1'],
                    required: true,
                    include:[
                        {
                            model: models.DesignationModel,
                            attributes:[['attribute2','Designation Name']],
                            required:true
                        },
                        {                            
                            model: models.BusinessUnitModel,
                            attributes:[['attribute2','Business Unit Name']],
                            required:false
                        },
                        {
                            model: models.DivisionModel,
                            attributes:[['attribute2','Division Name']],
                            required:true
                        },
                        {
                            model: models.LocationModel,
                            attributes:[['attribute4','Location Name']],
                            required:true
                        },
                        {
                            model: models.DepartmentModel,
                            attributes:[['attribute2','Department Name']],
                            required:true
                        },
                        {
                            model: models.PaygroupModel,
                            attributes:[['attribute2','Pay Group Name']],
                            required:true
                        },
                    ]   
                }
            ]
          }).then(function(empData){
              console.log(empData);
              res.send(JSON.stringify(empData));
            }).catch(function(err){
                console.log(err);
                res.send(err);
            })
    
    }

    //updating employee details
    update_emp(req,res,done){
        var models = global.requireL3('/modules/default/models',req);
        models.EmpInfoModel.find({
            where: { attribute1: req.body.id }, 
            include: [ { model : models.EmpJobModel } ] 
          }).then ( function( emp ) {
            return emp.EmpJobModels[0].updateAttributes({
            // return Promise.all([
                  attribute8:'testDATA'
              })
            //   emp.empob.map(fc => fc.updateAttributes({}))
            // ]);
          }).then(function(resp){
              res.send(resp);
          })
        //   .spread(function (filter, filteredContents) {
        //      res.send(filter);
        //  })
        // console.log('BODY:',req.body);
        // res.send('');
        // updateProfile={"attribute2":'asdas'}
        // var filter = {
        // where: {
        //     id: parseInt(req.body.id)
        // },
        // include: [
        //     { model: Profile }
        // ]
        // };

        // Product.findOne(filter).then(function (product) {
        // if (product) {
        //     return product.Profile.updateAttributes(updateProfile).then(function (result) {
        //     return result;
        //     });
        // } else {
        //     throw new Error("no such product type id exist to update");
        // }
        // });
    }

    create_emp(req,res,done){
        var models = global.requireL3('/modules/default/models',req);
        models.EmpInfoModel.create({  
            attribute4: req.body.firstname,
            attribute6: req.body.lastname
          }).then(emp => {		
              // Send created customer to client
              res.send(emp);
          });
      }

      
}