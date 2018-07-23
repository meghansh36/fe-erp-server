import { Component, OnInit } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formGenerator/components/text/text.component';

@Component({
  selector: 'fe-password',
  styleUrls: ['password.component.css'],
  templateUrl: 'password.component.html',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class FePasswordComponent extends TextComponent {

 
}