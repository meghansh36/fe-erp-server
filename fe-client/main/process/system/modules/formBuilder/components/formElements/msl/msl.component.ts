
import { Component } from '@angular/core';
import { SelComponent } from '@L3Process/system/modules/formBuilder/components/formElements/sel/sel.component';

@Component({
  selector: 'msl-input',
  templateUrl: './msl.component.html',
  styleUrls: ['./msl.component.css', '../baseField/baseField.component.css']
})
export class FeMslComponent extends SelComponent  {
  
  public properties = {
    
    ...this.properties,
    type: 'MSL',

  };
}
