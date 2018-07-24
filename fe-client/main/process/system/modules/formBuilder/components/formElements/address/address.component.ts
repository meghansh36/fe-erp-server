import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'adr-input',
  templateUrl: './address.component.html',
  styleUrls: ['../baseField/baseField.component.css', './address.component.css']
})

export class FeAddressComponent extends FeBaseField {


  public properties = {
    type: 'ADR',
    allowMultipleAddress: false,
    ...this.properties
  };


  public applicableProperties: any = {
    allowMultipleAddress: true,
    ...this.applicableProperties
  };

}
