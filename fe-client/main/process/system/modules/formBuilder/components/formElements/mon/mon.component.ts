import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'mon-input',
  templateUrl: './mon.component.html',
  styleUrls: ['./mon.component.css', '../baseField/baseField.component.css']
})
export class FeMonComponent extends FeBaseField {
  public properties = {
    type: 'MON',
    ...this.properties
  };
}
