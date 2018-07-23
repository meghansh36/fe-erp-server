import { Component, OnInit } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';

@Component({
  selector: 'pwd-input',
  templateUrl: './pwd.component.html',
  styleUrls: ['./pwd.component.css', '../baseField/baseField.component.css']
})
export class FePwdComponent extends TxtComponent  {
  
  public properties = {
    
    ...this.properties,
    type: 'PWD',

  };

 

}
