import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'acs-input',
  templateUrl: './acs.component.html',
  styleUrls: ['../baseField/baseField.component.css', './acs.component.css']
})
export class FeAcsComponent extends FeBaseField  {

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
