import { Component } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';
@Component({
  selector: 'num-input.fieldComponent',
  templateUrl: './num.component.html',
  styleUrls: ['./num.component.css', '../baseField/baseField.component.css']
})
export class FeNumComponent extends TxtComponent {

  properties = {
    
    minimumValue: undefined,
    maximumValue: undefined,
    useDelimeter: true,
    requiredDecimal: true,
    ...this.properties,
    type: 'NUM',
  };

  applicableProperties = {
    minimumValue: true,
    maximumValue: true,
    useDelimeter: true,
    requiredDecimal: true,
    ...this.applicableProperties
  };

}
