import { Component, OnInit } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formGenerator/components/text/text.component';

@Component({
  selector: 'fe-address',
  styleUrls: ['address.component.css'],
  templateUrl: 'address.component.html',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class FeAddressComponent extends TextComponent {

 
}