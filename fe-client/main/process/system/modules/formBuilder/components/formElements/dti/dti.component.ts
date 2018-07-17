import { Component, OnInit, DoCheck } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
import * as _ from 'lodash';
@Component({
  selector: 'dti-input',
  templateUrl: './dti.component.html',
  styleUrls: ['./dti.component.css', '../baseField/baseField.component.css']
})
export class FeDtiComponent extends FeBaseField implements OnInit, DoCheck {

  showEdit = true;
  properties = {
  label: 'test',
  prefix: '',
  suffix: '',
  description: '',
  placeholder: 'test',
  tooltip: '',
  ...this.properties  
};


  applicableProperties={
    dateTimeFormat:true,
    useLocalSetting:true,
    numbersOfDate:true,
    minimumDate:true,
    maximumDate:true,
    minimumMode:true,
    maximumMode:true,
    calculatedValue:true,
    startingDay:true,
    hourTime:true,
    placeholder:true,
    description:true,
    inputMask:true,
    prefix:true,
    suffix:true,
    clearValue:true,
    hidden:true,
    disabled:true,
    appliedValidation:true,
    customErrorMessage:true,
    customValidationFunction:true,
    customJsonLogic:true,
    customFunction:true,
    jsonLogic:true,
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
  }

  ngDoCheck() {
  //   const propsFromMasterForm = this.masterFormService.getProperties(this.uniqueKey);
  //  // console.log("master form props", propsFromMasterForm);
  //   if (propsFromMasterForm) {
  //     this.update(propsFromMasterForm);
  // }
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
