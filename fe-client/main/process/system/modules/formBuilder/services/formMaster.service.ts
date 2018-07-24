import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
@Injectable()
export class FeFormMasterService {

  modalReference: NgbModalRef;
  properties;
  currentEventType;
  key;
  Json;
  formLabel:string;
  name :string;
  display: string ='conventional';
  disabled: boolean;
  hidden: boolean;
  conditionalHidden: string;
  conditionalDisabled: string;
  active: boolean;
  help: string;


  constructor(private masterJsonService: FormJsonService) {
   }

  setModalRef(temp) {
    this.modalReference = temp;
  }

  getModalRef() {
    return this.modalReference;
  }

  setProperties(props, key) {
    // const masterJSON = this.masterJsonService.getMasterJSON();
    // console.log("master json", masterJSON);
    // if (masterJSON.components[key] === undefined) {
    //   masterJSON.buttons[key].instance.properties = _.assignIn({}, props);
    // } else {
    //   masterJSON.components[key].instance.properties = _.assignIn({}, props);
    // }

    // this.masterJsonService.setMasterJSON(masterJSON);
    this.masterJsonService.setMasterJSON(props, key);
  }

  getProperties(key) {
    const masterJSON = this.masterJsonService.getMasterJSON();
    if (masterJSON.components[key] === undefined) {
      return masterJSON.buttons[key].instance.properties;
    }
    return masterJSON.components[key].instance.properties;
  }

  setCurrentKey(key) {
    this.key = key;
  }

  getCurrentKey() {
   return this.key;
  }
}
