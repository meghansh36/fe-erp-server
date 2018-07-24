import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'mon-input',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css', '../baseField/baseField.component.css']
})
export class FeMonthComponent extends FeBaseField {
  public properties = {
    type: 'MON',
    ...this.properties
  };
}
