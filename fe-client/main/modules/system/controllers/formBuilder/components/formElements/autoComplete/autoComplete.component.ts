import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'acs-input',
  templateUrl: './autoComplete.component.html',
  styleUrls: ['../baseField/baseField.component.css', './autoComplete.component.css']
})
export class FeAutoCompleteComponent extends FeBaseField  {

  public properties = {
    type: 'ACS',
    ...this.properties
  };

  public applicableProperties: any = {
    lovType: true,
  	lovSqlQuery:true,
    lovJson:true,
    prefix: true,
    suffix: true,
    ...this.applicableProperties
  };

}
