import { Component } from '@angular/core';
import { TxaComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txa/txa.component';

@Component({
  selector: 'fe-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class FeHTMLComponent extends TxaComponent   {

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
