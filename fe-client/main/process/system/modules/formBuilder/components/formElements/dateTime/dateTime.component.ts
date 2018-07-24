import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'dti-input',
  templateUrl: './dateTime.component.html',
  styleUrls: ['./dateTime.component.css', '../baseField/baseField.component.css']
})
export class FeDateTimeComponent extends FeBaseField {
  
  public properties = {
    type: 'DTI',
    ...this.properties
  };

}
