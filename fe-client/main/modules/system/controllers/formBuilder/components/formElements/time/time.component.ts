import { Component, OnInit} from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'tim-input',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css', '../baseField/baseField.component.css']
})
export class FeTimeComponent extends FeBaseField {

  selectedDate;
  config = {
    disableKeyPress: true,
    showMultipleYearsNavigation: true,
    drops: 'down'
  };
  public properties = {
    type: 'TIM',
    ...this.properties
  };

}
