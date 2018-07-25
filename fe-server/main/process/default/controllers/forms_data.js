module.exports = class FeFormsData{

    constructor(){ }
 
    //reading emplyee details frm all the tables.
    forms_data(req,res,done) {
        var clientName = req.params.client;
        FE.clients[clientName].models.FormsData.findAll({
            attributes:['ID','FORM_CODE','LABEL']
        }).then(function(formsData){

            var data = {};
            // var formsArray = [];
            // formsData.forEach(data => {
            //     var formObj = {};
            //     formObj.formcode = data.FORM_CODE;
            //     formObj.label = data.LABEL;
            //     formObj.id = data.ID;
            //     formsArray.push(formObj);
            // });  
            data.data = formsData;

       // console.log(formsData);
        res.json(data);
        }).catch(function(err){
            console.log(err);
            res.send(err);
        })
    }
    
    save_form_data(req,res,done){
        var json_data = req.body.json;
        console.log(json_data);
        //json_data = JSON.parse(json_data);
        var form_label = req.body.formLabel;
        var clientName = req.params.client;
        FE.clients[clientName].models.FormsData.create({  
            FORM_CODE: 'FRM' + (Math.random()*10),
            FORM_JSON: JSON.stringify(req.body.json_data),
            LABEL: form_label
          }).then(form => {
              res.send(form);
          });
      };



      save_grid_data(req,res,done){
        var form_json = req.body.form_json;
        var grid_json = req.body.grid_json;
        //console.log(json_data);
        //json_data = JSON.parse(json_data);
        var form_label = req.body.formLabel;
        var clientName = req.params.client;
        FE.clients[clientName].models.FormsData.create({  
            FORM_CODE: 'FRM' + Math.round(Math.random()*10)   ,
            FORM_JSON: req.body.form_json,
            GRID_JSON:req.body.grid_json,
            LABEL: form_label
          }).then(form => {
              res.send(form);
          });
      };

    update_form_data(req,res,done){
        var form_json = req.body.form_json;
        var grid_json = req.body.grid_json;
        var clientName = req.params.client;
        var form_label = req.body.formLabel;
        FE.clients[clientName].models.FormsData.find({
            where: { ID: req.body.id }, 
          }).then ( function( form ) {
            return form.FormsData[0].updateAttributes({
            // return Promise.all([
                  FORM_JSON:req.body.form_json,
                  GRID_JSON:req.body.grid_json,
                  LABEL: form_label
              })
            //   emp.empob.map(fc => fc.updateAttributes({}))
            // ]);
          }).then(function(resp){
              res.send(resp);
          })
    }

     
    form_data(req,res,done) {
        var clientName = req.params.client;
        var condition={};
        if(!req.body.id) condition.FORM_CODE = req.body.code
        else condition = req.body.id; 
        FE.clients[clientName].models.FormsData.find({
            where: condition,
            attributes:['FORM_CODE','LABEL','ID','FORM_JSON']
        }).then(function(formData){
                formData.FORM_JSON = JSON.parse(formData.FORM_JSON);
                formData.FORM_JSON.id = formData.ID;
                formData.FORM_JSON.formcode = formData.FORM_CODE;
                res.json(formData.FORM_JSON);
        }).catch(function(err){
            console.log(err);
            res.send(err);
        })
    }

    grid_data(req,res,done) {
        var clientName = req.params.client;
        var condition={};
        condition.FORM_CODE = req.body.code;
        FE.clients[clientName].models.FormsData.find({
            where: condition,
            attributes:['ID','GRID_JSON']
        }).then(function(gridData){
                var grid_data = {};
                grid_data.grid_json =  JSON.parse(gridData.GRID_JSON);
                grid_data.id = gridData.ID;
                res.send(grid_data);
        }).catch(function(err){
            console.log(err);
            res.send(err);
        })
    }


}