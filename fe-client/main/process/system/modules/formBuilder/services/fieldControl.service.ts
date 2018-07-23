import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class FeFieldControlService {

  instanceArray: Object[] = [];
  modalParent;
  component;
  viewRef;
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
     component: this.component,
     viewRef: this.viewRef
    };
  }

  addToFstCollection(fstRef, key) {
    this.fstCollection = _.merge(this.fstCollection, {[key]: fstRef});
  }
  getFstCollection(key) {
    return this.fstCollection[key];
  }
}
