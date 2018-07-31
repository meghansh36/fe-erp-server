/*
 *@Service Description
 *
 * This service is used to set the field references and also pushes ng-template references
 * in fstContainerCollection when new fieldset is created
 */

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class FeFieldControlService {

  instanceArray: Object[] = [];
  modalParent;
  component;
  fstCollection = {};

  constructor() { }

/*
 * @function Description
 * Arguments ==> reference - component reference of the field returned by angular
 *               parent - parent class where the modal is opened (formBuilder class)
 *
 *This function sets the modalParent and component variables. It also pushes the component
 *reference in the instanceArray
 */
  setFieldRef(reference, parent, component) {
    this.modalParent = parent;
    this.instanceArray.push(reference);
    this.component = component;

  }

/*
 * @function Description
 *
 *This function returns an object containig the component reference, modalParent and component 
 *name
 */
  getFieldRef() {
   return {
     ref: this.instanceArray[this.instanceArray.length - 1],
     parent: this.modalParent,
     component: this.component, // name of component
    };
  }

/*
 * @function Description
 * Arguments ==> fstRef - ng-template reference in the fieldset container
 *               key - key of fieldset
 *
 *This function adds the ng-template reference mapped to fieldset key in the fstCollection object
 */
  addToFstCollection(fstRef, key) {
    this.fstCollection = _.merge(this.fstCollection, {[key]: fstRef});
  }

  /*
 * @function Description
 * Arguments ==> key - key of fieldset
 *
 *This function returns the ng-template reference of the fieldset according to key.
 */
  getFstCollection(key) {
    return this.fstCollection[key];
  }
}
