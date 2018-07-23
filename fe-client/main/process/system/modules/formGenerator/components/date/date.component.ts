import { Component, ElementRef, Renderer2 } from '@angular/core';
import { BaseComponent } from '@L3Process/system/modules/formGenerator/components/base.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FeDateFormatterService } from '@L1Process/system/services/feDateFormatter.service';
import { ValidatorsService } from '@L3Process/system/modules/formGenerator/services/validators.service';
import { UtilityService } from '@L3Process/system/services/utility.service';
import { DefaultsService } from '@L3Process/system/services/Defaults.service';

@Component({
  selector: 'fe-date',
  styleUrls: ['date.component.css'],
  templateUrl: 'date.component.html',
  providers: [{
    provide: NgbDateParserFormatter,
    useClass: FeDateFormatterService
  }]
})
export class FeDateComponent extends BaseComponent {

  constructor(protected  _elemRef: ElementRef, protected  _validator: ValidatorsService, protected  _render: Renderer2, protected  _utility: UtilityService, protected  _defaults: DefaultsService, protected  _date: FeDateFormatterService) {
    super(_elemRef, _validator, _render, _utility, _defaults);
  }

  _addExtraValidations() {
    super._addExtraValidations();
    if (  this.minimumDate) {
      this._addNgValidation(this._validator.getCustomValidation('minDate'));
    } else if (this.maximumDate) {
        this._addNgValidation(this._validator.getCustomValidation('maxDate', this.maximumDate));
    }
  }

  get minDate() {
    if (!this.minimumDate) {
      this.minimumDate = this._defaults.MIN_DATE;
    }
    console.log("this.minimumDate");
    const date = this._date.parse(this.minimumDate);
    console.log("minDate", date);
    return date;
  }

  get maxDate() {
    if (!this.maximumDate) {
      this.maximumDate = this._defaults.MAX_DATE;
    }
    console.log("this.maximumDate",this.maximumDate);
    const date = this._date.parse(this.maximumDate);
    console.log("maxDate", date);
    return date;
  }

  get minimumDate() {
    return this._config.minimumDate;
  }

  get maximumDate() {
    return this._config.maximumDate;
  }

  set maximumDate(_date) {
    this._config.maximumDate = _date;
  }

  set minimumDate(_date) {
    this._config.minimumDate = _date;
  }

}
