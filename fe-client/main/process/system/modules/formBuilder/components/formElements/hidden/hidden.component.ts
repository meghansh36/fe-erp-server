import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'hid-input',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.css','../baseField/baseField.component.css']
})
export class FeHiddenComponent extends FeBaseField  {
  
  public properties = {
    
    ...this.properties,
    type: 'HID',
  };

  public applicableProperties: any = {
  	label:true,
  	flexiLabel: true,
    events: true,
    active: true
  };

}
