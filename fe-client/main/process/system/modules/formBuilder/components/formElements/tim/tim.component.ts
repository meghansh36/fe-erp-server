import { Component, OnInit} from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'tim-input',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css', '../baseField/baseField.component.css']
})
export class FeTimComponent extends FeBaseField {
  
  public properties = {
    type: 'TIM',
    ...this.properties
  };

}
