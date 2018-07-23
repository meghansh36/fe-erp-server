import { Component, OnInit } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';
@Component({
  selector: 'shopclues-eml',
  templateUrl: './eml.component.html',
  styleUrls: ['./eml.component.css', '../baseField/baseField.component.css']
})
export class FeEmlComponent extends TxtComponent {
  public properties = {
    ...this.properties,
    type: 'EML',
  };

  public applicableProperties: any = {
    prefix: true,
    suffix: true,
    ...this.applicableProperties
  };
}
