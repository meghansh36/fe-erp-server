import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@L3Process/system/modules/formBuilder/components/formElements/button/button.component';

@Component({
  selector: 'icb-input.button-input',
  templateUrl: './iconicButton.component.html',
  styleUrls: ['./iconicButton.component.css', '../baseField/baseField.component.css']
})
export class FeIconicButtonComponent extends ButtonComponent  {
  
  public properties = {
   
    ...this.properties,
    type: 'ICB',
    icon: '',
  };

  public applicableProperties = {
	
    ...this.applicableProperties,
    theme: true,
    size: true,
  	btnLeftIcon:  false,
    btnRightIcon: false,
    icon: true,
    label: false
	};

}
