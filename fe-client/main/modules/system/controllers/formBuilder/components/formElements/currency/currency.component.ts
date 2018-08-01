import { Component, OnInit } from '@angular/core';
import { TextComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/text/text.component';
import * as _ from 'lodash';
@Component({
  selector: 'cur-input',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css', '../baseField/baseField.component.css']
})
export class FeCurrencyComponent extends TextComponent {

  public properties = {
	  ...this.properties,
	  type: 'CUR'
  };

}
