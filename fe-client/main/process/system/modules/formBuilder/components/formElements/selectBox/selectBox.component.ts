import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'selectbox-input',
  templateUrl: './selectBox.component.html',
  styleUrls: ['./selectBox.component.css', '../baseField/baseField.component.css']
})
export class FeSelectBoxesComponent extends FeBaseField  {

  public properties = {
    type: 'MCH',
    ...this.properties
  };

  public applicableProperties = {
    ...this.applicableProperties
  }

}

