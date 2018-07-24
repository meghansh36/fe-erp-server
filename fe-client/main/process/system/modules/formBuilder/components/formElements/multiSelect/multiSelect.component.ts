
import { Component } from '@angular/core';
import { SelectComponent } from '@L3Process/system/modules/formBuilder/components/formElements/select/select.component';

@Component({
  selector: 'msl-input',
  templateUrl: './multiSelect.component.html',
  styleUrls: ['./multiSelect.component.css', '../baseField/baseField.component.css']
})
export class FeMultiSelectComponent extends SelectComponent  {
  
  public properties = {
    
    ...this.properties,
    type: 'MSL',

  };
}
