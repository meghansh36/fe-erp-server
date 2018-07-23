import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@L3Process/system/modules/formGenerator/components/base.component';

@Component({
  selector: 'fe-text',
  styleUrls: ['text.component.css'],
  templateUrl: 'text.component.html',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class FeTextComponent extends BaseComponent implements OnInit {

  public length: number = 0;
  protected _$changeObserver: any;
  protected _conditionClass: string;
  _onKeypress(e) {
    if (this.hasMaxLength) {
      const limit = +this.len;
      if (e.target.value.length === this.maxLength) e.preventDefault();
    }
  }

  protected _afterNgOnDestroy() {
    super._afterNgOnDestroy();
    this._$changeObserver.unsubscribe();
  }

  protected _afterNgOnInit() {
    super._afterNgOnInit();
    this._$changeObserver = this.control.valueChanges.subscribe(this.changeLength.bind(this));
  }

  changeLength(data: string) {
    if (data != undefined) {
      this.len = data.length;
      if (this.len < this.minLength) {
        this._Class = 'badge-danger';
      } else {
        this._Class = 'badge-success';
      }
    }
  }

  get hasMinLength() {
    return this.hasValidation('minLength');
  }

  get hasMaxLength() {
    return this.hasValidation('maxLength');
  }
  get minLength() {
    if (this.hasMinLength) {
      return this._config.validations.minLength.value;
    }
    return 0;
  }

  get maxLength() {
    if (this.hasMaxLength) {
      return this._config.validations.maxLength.value;
    }
    return 0;
  }

  get maskConfig() {
    //console.log("maskConfig", this.mask);
    if (this.mask) {
      return { mask: this.mask };
    }
    return { mask: false };
  }

  get len() {
    return this.length;
  }
  set len(len) {
    this.length = len;
  }

  set _Class(changeClass) {
    this._conditionClass = changeClass;
  }
  get _Class() {
    return this._conditionClass;
  }
}