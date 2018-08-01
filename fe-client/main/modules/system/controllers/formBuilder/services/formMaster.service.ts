/*
*@Service Description
*This service is responsible for Master Form functions. It sets the modal reference and returns
*it so that it can be used by other components to close the modal.
*It also gets and sets the field properties.
*/

import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormJsonService } from '@L3Modules/system/controllers/formBuilder/services/formJson.service';

@Injectable()
export class FeFormMasterService {

  modalReference: NgbModalRef;
  key;


  constructor(private masterJsonService: FormJsonService) {}

  /*
  *@function Description
  *Arguments ==> modalRef - bootstrap modal reference
  *
  * This function sets the modal reference of bootstrap modal.
  */
  setModalRef(modalRef) {
    this.modalReference = modalRef;
  }

  /*
  *@function Description
  *
  * Returns the modal reference
  */
  getModalRef() {
    return this.modalReference;
  }

 /*
  *@function Description
  *Arguments ==> props - field properties
  *              key - unique key of the field component
  *
  *This function sets the properties of the field components in the masterJSON
  */
  setProperties(props, key) {
    this.masterJsonService.setMasterJSON(props, key);
  }

  /*
  *@function Description
  *Arguments ==> key - unique key of the field components
  *
  * This function returns the properties of the components in the MasterJSON
  */
  getProperties(key) {
    // get masterjson from the service
    const masterJSON = this.masterJsonService.getMasterJSON();
    // if the component is not found in the components object in MasterJSON, look in buttons object
    if (masterJSON.components[key] === undefined) {
      return masterJSON.buttons[key].instance.properties;
    }
    return masterJSON.components[key].instance.properties;
  }

  /*
  *@function Description
  *Arguments ==> key - unique key of the field component.
  *
  * This function sets the key of the component whose Field properties modal is opened.
  */
  setCurrentKey(key) {
    this.key = key;
  }

  /*
  *@function Description
  *
  * This function returns the current key.
  */
  getCurrentKey() {
    return this.key;
  }
}
