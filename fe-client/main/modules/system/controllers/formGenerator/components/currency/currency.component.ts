import { Component } from '@angular/core';
import { NumberComponent } from '@L3Modules/system/controllers/formGenerator/components/number/number.component';
//import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as _ from 'lodash';


@Component({
  selector: 'fe-currency',
  styleUrls: ['currency.component.css'],
  templateUrl: 'currency.component.html'
})
export class FeCurrencyComponent extends NumberComponent {
  
}
