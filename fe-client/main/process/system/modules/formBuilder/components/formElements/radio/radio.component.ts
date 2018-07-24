
import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'rad-input',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css', '../baseField/baseField.component.css']
})
export class FeRadioComponent extends FeBaseField  {
  public properties = {
    
    inputPropsArray: [
      {
        label: 'test',
        value: ''
      }
    ],
    ...this.properties,
    type: 'CHK',
  };

  public applicableProperties = {
    multipleInputs: true,
    ...this.applicableProperties
  };

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
