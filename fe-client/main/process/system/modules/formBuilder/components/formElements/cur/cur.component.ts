import { Component, OnInit } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';
import * as _ from 'lodash';
@Component({
  selector: 'cur-input',
  templateUrl: './cur.component.html',
  styleUrls: ['./cur.component.css', '../baseField/baseField.component.css']
})
export class FeCurComponent extends TxtComponent {

  public properties = {
    type: 'CUR',
    ...this.properties
  };

}
