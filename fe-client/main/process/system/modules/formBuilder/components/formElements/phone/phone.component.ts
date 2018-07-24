import { Component, OnInit } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formBuilder/components/formElements/text/text.component';

@Component({
  selector: 'phn-input',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css', '../baseField/baseField.component.css']
})
export class FePhoneComponent extends TextComponent  {
 
  public properties = {
    
    ...this.properties,
    type: 'PHN',

  };

}
