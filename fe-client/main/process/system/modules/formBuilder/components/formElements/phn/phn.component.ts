import { Component, OnInit } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';

@Component({
  selector: 'phn-input',
  templateUrl: './phn.component.html',
  styleUrls: ['./phn.component.css', '../baseField/baseField.component.css']
})
export class FePhnComponent extends TxtComponent  {
 
  public properties = {
    
    ...this.properties,
    type: 'PHN',

  };

}
