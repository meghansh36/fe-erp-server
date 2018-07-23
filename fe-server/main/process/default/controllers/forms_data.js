module.exports = class FeFormsData{

    constructor(){ }
 
    //reading emplyee details frm all the tables.
    forms_data(req,res,done) {
        var clientName = req.params.client;
        FE.clients[clientName].models.FormsData.findAll({
            attributes:['FORM_CODE','LABEL']
        }).then(function(formsData){

            var data = {};
            var formsArray = [];
            formsData.forEach(data => {
                var formObj = {};
                formObj.formcode = data.FORM_CODE;
                formObj.label = data.LABEL;
                formObj.id = data.ID;
                formsArray.push(formObj);
            });
            data.key = formsArray;

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
            JSON: req.body.json_data,
            LABEL: form_label
          }).then(form => {
              res.send(form);
          });
      };


    update_form_data(req,res,done){
        var json_data = req.body.json;
        var clientName = req.params.client;
        var form_label = req.body.formLabel;
        FE.clients[clientName].models.FormsData.find({
            where: { ID: req.body.id }, 
          }).then ( function( form ) {
            return form.FormsData[0].updateAttributes({
            // return Promise.all([
                  JSON:req.body.json,
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
        FE.clients[clientName].models.FormsData.find({
            where: req.body.id,
            attributes:['FORM_CODE','LABEL','ID','JSON']
        }).then(function(formData){
                formData.JSON.id = formData.ID;
                formData.JSON.formcode = formData.FORM_CODE;
                res.json(formData.JSON);
        }).catch(function(err){
            console.log(err);
            res.send(err);
        })
    }

}