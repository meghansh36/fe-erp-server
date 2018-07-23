import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css', '../baseField/baseField.component.css']
})
export class FeSignComponent extends FeBaseField  {
  public length;
  public properties = {
    ...this.properties,
    type: 'SIGN',

  };

  public applicableProperties: any = {
    ...this.applicableProperties
  };

}
