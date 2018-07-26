
import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'anc-input',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.css', '../baseField/baseField.component.css']
})
export class FeAnchorComponent extends FeBaseField  {
  public properties = {
		...this.properties,
		type: 'ANC',
  };

}
