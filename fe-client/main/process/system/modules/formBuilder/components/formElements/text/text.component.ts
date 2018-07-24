import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'txt-input.fieldComponent',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css', '../baseField/baseField.component.css']
})
export class FeTextComponent extends FeBaseField  {
  public length;
  public properties = {
    type: 'TXT',
    ...this.properties
  };

  

  public applicableProperties: any = {
    prefix: true,
    suffix: true,
    minimumLength:true,
    maximumLength:true,
    mask: true,
    ...this.applicableProperties
  };

  get maskConfig() {
    if (this.mask) {
      let mask = this.mask;
      if ( typeof mask === 'string' ) {
        (<any>window).inputMask = [];
        const strExpr = `window.inputMask = ${mask}`;
        eval( strExpr );
        mask = (<any>window).inputMask;
      } 

      if ( mask.constructor === Array ) {
        return { mask };
      }
    }
    return { mask: null };
  }

  get len() {
    return this.length;
  }
  set len(len) {
    this.length = len;
  }

}
