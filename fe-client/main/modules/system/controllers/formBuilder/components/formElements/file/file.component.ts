import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css', '../baseField/baseField.component.css']
})
export class FeFileComponent extends FeBaseField  {
  public length;
  public properties = {
    ...this.properties,
    fileMinimumSize: '',
    fileMaximumSize: '',
    type: 'FILE',
  };

  public applicableProperties: any = {
    fileMinimumSize: true,
    fileMaximumSize: true,
    ...this.applicableProperties
  };

}
