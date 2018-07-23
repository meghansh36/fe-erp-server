import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'chk-input',
  templateUrl: './chk.component.html',
  styleUrls: ['./chk.component.css', '../baseField/baseField.component.css']
})
export class FeChkComponent extends FeBaseField  {

  public properties = {
    type: 'CHK',
    inputPropsArray: [
      {
        label: 'test',
        value: ''
      }
    ],
    ...this.properties
  };

  public applicableProperties = {
    multipleInputs: true,
    ...this.applicableProperties
  }

  deleteInput(index) {
    console.log('delete clicked', index);
    this.properties.inputPropsArray.splice(index, 1);
    console.log(this.properties);
  }

  addInput() {
    console.log('add clicked');
    this.properties.inputPropsArray.push({label: '', value: ''});
  }

}
