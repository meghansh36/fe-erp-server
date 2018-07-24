import { Component, OnInit } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formBuilder/components/formElements/text/text.component';

@Component({
  selector: 'pwd-input',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', '../baseField/baseField.component.css']
})
export class FePasswordComponent extends TextComponent  {
  
  public properties = {
    
    ...this.properties,
    type: 'PWD',

  };

 

}
