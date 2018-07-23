import { Component } from '@angular/core';
import { NumberComponent } from '@L3Process/system/modules/formGenerator/components/number/number.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as _ from 'lodash';


@Component({
  selector: 'fe-phone',
  styleUrls: ['phone.component.css'],
  templateUrl: 'phone.component.html'
})
export class FePhoneComponent extends NumberComponent {
  
}
