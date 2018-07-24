import { Component, OnInit } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formBuilder/components/formElements/text/text.component';
@Component({
  selector: 'shopclues-eml',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css', '../baseField/baseField.component.css']
})
export class FeEmailComponent extends TextComponent {
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
