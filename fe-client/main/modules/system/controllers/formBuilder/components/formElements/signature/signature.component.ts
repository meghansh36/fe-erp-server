import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'sign',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css', '../baseField/baseField.component.css']
})
export class FeSignatureComponent extends FeBaseField  {
  public length;
  public properties = {
    ...this.properties,
    type: 'SIGN',

  };

  public applicableProperties: any = {
    ...this.applicableProperties
  };

}
