import { Component } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formBuilder/components/formElements/text/text.component';
@Component({
  selector: 'num-input.fieldComponent',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css', '../baseField/baseField.component.css']
})
export class FeNumberComponent extends TextComponent {

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
