import { Component } from '@angular/core';
import { SelectComponent } from "@L3Modules/system/controllers/formBuilder/components/formElements/select/select.component";

@Component({
  selector: 'selectbox-input',
  templateUrl: './selectBox.component.html',
  styleUrls: ['./selectBox.component.css', '../baseField/baseField.component.css']
})
export class FeSelectBoxComponent extends SelectComponent  {

  public properties = {
	  ...this.properties,
	  type: 'MCH'
  };
}

