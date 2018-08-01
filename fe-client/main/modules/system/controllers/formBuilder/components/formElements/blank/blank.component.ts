import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'blk-input',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css', '../baseField/baseField.component.css']
})
export class FeBlankComponent extends FeBaseField  {
  applicableProperties={
    flexiLabel: true,
    label: true,
    type:true,
    width: true,
  };

  properties = {
    flexiLabel: '',
    label: '',
    type:'BLK',
    width: ''
  };
}
