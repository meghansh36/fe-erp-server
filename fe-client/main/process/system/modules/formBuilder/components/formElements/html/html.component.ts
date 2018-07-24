import { Component } from '@angular/core';
import { TextAreaComponent } from '@L3Process/system/modules/formBuilder/components/formElements/textArea/textArea.component';

@Component({
  selector: 'fe-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class FeHTMLComponent extends TextAreaComponent   {

  properties = {
    ckSettings: '',
    ...this.properties,
    type: 'HTML',
  };

  public applicableProperties: any = {
    ckSettings:true,
    ...this.applicableProperties,
    rows: false,
    mask: false
  };

}
