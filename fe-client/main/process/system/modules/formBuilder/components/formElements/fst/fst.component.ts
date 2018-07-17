import * as _ from 'lodash';
import { Component, OnInit, ViewChild, DoCheck, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'fst-input.fieldContainerComponent.fieldComponent',
  templateUrl: './fst.component.html',
  styleUrls: ['./fst.component.css', '../baseField/baseField.component.css']
})
export class FeFstComponent extends FeBaseField  implements OnInit, DoCheck {

  @ViewChild('fstContainer', {read: ViewContainerRef}) fstContainer: ViewContainerRef;
  @Output() hostRef = new EventEmitter<ViewContainerRef>();

  showEdit = true;
  properties = {
  label: 'test',
  prefix: undefined,
  suffix: undefined,
  description:  '',
  placeholder:  'test',
  tooltip: undefined,
  labelPosition: 'top',
  labelMargin: 10,
  ...this.properties
};

  applicableProperties={
    inputMask:true,
    placeholder:true,
    prefix:true,
    suffix:true,
    ...this.applicableProperties
}

  ngOnInit() {

    // this.properties = {
    //   label: 'test',
    //   prefix: '',
    //   suffix: '',
    //   description: '',
    //   placeholder: 'test',
    //   tooltip: ''
    // };
    console.log("initialized a new instance", this.properties);
    this.setRef(this.fieldControlService.getFieldRef().ref);
    this.uniqueKey = this.masterFormService.getCurrentKey();
    console.log(this.uniqueKey);
   // this.masterFormService.setCurrentKey(this.uniqueKey);
    this.masterFormService.setProperties(this.properties);
    // this.applicableProperties={
    //   ...this.textApplicableProperties,
    //   ...this.applicableProperties
    // }

    console.log("base field property is ",this.applicableProperties);
    console.log('show edit called',this.properties.labelPosition, this.showEdit);
    this.fieldControlService.addToFstCollection(this.fstContainer, this.uniqueKey);
  }

  ngDoCheck() {
  //   const propsFromMasterForm = this.masterFormService.getProperties(this.uniqueKey);
  //  // console.log("master form props", propsFromMasterForm);
}

  openModal() {
    this.masterFormService.setCurrentKey(this.uniqueKey);
    this.masterFormService.setProperties(this.properties);
    this.fieldControlService.getFieldRef().parent.openModal();
  }

  update(propsFromMasterForm) {
    this.properties = _.assignIn({}, propsFromMasterForm);
  }
}
