import { Component } from '@angular/core';
import { TextComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/text/text.component';

@Component({
  selector: 'txa-input',
  templateUrl: './textArea.component.html',
  styleUrls: ['./textArea.component.css', '../baseField/baseField.component.css']
})
export class FeTextAreaComponent extends TextComponent   {
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



