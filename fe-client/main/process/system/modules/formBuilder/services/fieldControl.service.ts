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

  
  setFieldRef(reference, parent, component) {
    this.modalParent = parent;
    this.instanceArray.push(reference);
    this.component = component;

  }

  getFieldRef() {
   return {
     ref: this.instanceArray[this.instanceArray.length - 1],
     parent: this.modalParent,
     component: this.component, // name of component
    };
  }

  addToFstCollection(fstRef, key) {
    this.fstCollection = _.merge(this.fstCollection, {[key]: fstRef});
  }
  getFstCollection(key) {
    return this.fstCollection[key];
  }
}
