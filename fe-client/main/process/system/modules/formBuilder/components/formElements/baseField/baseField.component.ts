import { FormMasterService } from "@L3Process/system/modules/formBuilder/services/formMaster.service";
import { FieldControlService } from "@L3Process/system/modules/formBuilder/services/fieldControl.service";
import { Injectable } from "@angular/core";
import { FormJsonService } from "@L3Process/system/modules/formBuilder/services/formJson.service";

@Injectable()
export class FeBaseField {
  uniqueKey;

  applicableProperties:any = {
    label:true,
    hideLabel:true,
    labelPosition:true,
    tooltip:true,
    errorLabel:true,
    customCssClass:true,
    tabIndex:true,
    marginTop:true,
    marginRight:true,
    marginLeft:true,
    marginBottom:true,
    defaultValue:true,
    sqlQuery:true,
    nonPersistent:true,
    autoComplete:true,
  };

  properties:any = {
    hideLabel: false,
    labelPosition: 'top',
    tooltip: undefined,
    errorLabel: undefined,
    customCssClass: undefined,
    tabIndex: undefined,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    defaultValue: 'none',
    sqlQuery: undefined,
    nonPersistent: false,
    autoComplete: undefined,
    componentname: undefined
  };

  constructor(
    public fieldControlService: FieldControlService,
    public masterFormService: FormMasterService,
    public formJsonService: FormJsonService
  ) {}
  refObj;
  componentname;
  setRef(reference) {
    this.refObj = reference;
    console.log('ref', reference)
   // this.properties.componentname = reference.component.component.name;
  }

  close() {
    this.formJsonService.removeComponent(this.uniqueKey);
    this.refObj.destroy();
    this.formJsonService.buildFinalJSON();
  }

  openModal() {}
}
