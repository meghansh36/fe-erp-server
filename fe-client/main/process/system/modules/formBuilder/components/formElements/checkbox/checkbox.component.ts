import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'chk-input',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css', '../baseField/baseField.component.css']
})
export class FeCheckboxComponent extends FeBaseField  {

  public properties = {
	...this.properties,
	type: 'CHK',
  };

  public applicableProperties = {
    ...this.applicableProperties
  }

}
