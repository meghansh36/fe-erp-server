import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'sel-input',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css', '../baseField/baseField.component.css']
})
export class FeSelectComponent extends FeBaseField {
  
  public properties = {
    type: 'SEL',
    ...this.properties
  };

  public applicableProperties: any = {
    lovType: true,
  	lovSqlQuery:true,
  	lovJson:true,
    ...this.applicableProperties
  };

  get options() {
    return this.properties.lovJson || [];
  }

}
