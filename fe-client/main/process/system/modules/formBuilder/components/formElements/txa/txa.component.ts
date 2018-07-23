import { Component } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';

@Component({
  selector: 'txa-input',
  templateUrl: './txa.component.html',
  styleUrls: ['./txa.component.css']
})
export class FeTxaComponent extends TxtComponent   {
  showEdit = true;
  properties = {
    
    enableSpellCheck: true,
    rows: 5,
    ...this.properties,
    type: 'TXA',
    
  };

  public applicableProperties: any = {
    enableSpellCheck: true,
    rows: true,
    ...this.applicableProperties,
    inputMask: false
  };

}



