import { Component } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formGenerator/components/text/text.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as _ from 'lodash';


@Component({
  selector: 'fe-number',
  styleUrls: ['number.component.css'],
  templateUrl: 'number.component.html'
})
export class FeNumberComponent extends TextComponent {
  public numberMask: any;

  protected _afterNgOnInit() {
    super._afterNgOnInit();
    this._applyNumericMask();
  }

  protected _applyNumericMask() {
    let maskConfig = {};
    if (this.requiredDecimal) {
      const config = {
        decimalLimit: this._defaults.DECIMAL_LIMIT,
        integerLimit: this._defaults.INTEGER_LIMIT,
        allowDecimal: true
      };
      maskConfig = _.assign({}, maskConfig, config);
    }
    if (this.useDelimeter) {
      const config = {
        includeThousandsSeparator: true
      };
      maskConfig = _.assign({}, maskConfig, config);
    }
    this.numberMask = createNumberMask(maskConfig);
  }

  get useDelimeter() {
    return this._config.useDelimeter;
  }

  set useDelimeter(useDelimeter) {
    this._config.useDelimeter = useDelimeter;
  }

  get requiredDecimal() {
    return this._config.requiredDecimal;
  }

  set requiredDecimal(requiredDecimal) {
    this._config.requiredDecimal = requiredDecimal;
  }

}
