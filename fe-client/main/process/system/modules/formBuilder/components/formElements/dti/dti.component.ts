import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'dti-input',
  templateUrl: './dti.component.html',
  styleUrls: ['./dti.component.css', '../baseField/baseField.component.css']
})
export class FeDtiComponent extends FeBaseField {
  
  public properties = {
    type: 'DTI',
    ...this.properties
  };

}
