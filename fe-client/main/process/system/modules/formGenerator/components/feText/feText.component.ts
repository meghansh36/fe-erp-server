import { Component, OnInit } from '@angular/core';
import { FeBaseComponent } from '@L1Process/system/modules/formGenerator/components/feBase.component';

@Component({
  selector: 'fe-text',
  styleUrls: ['feText.component.css'],
  templateUrl: 'feText.component.html',
  host: {
    '(keypress)': '_onKeypress($event)',
  }
})
export class FeTextComponent extends FeBaseComponent implements OnInit {

  public length: number = 0;
  _onKeypress(e) {
    if (this.hasMaxLength) {
      const limit = +this.len;
      if (e.target.value.length === this.maxLength) e.preventDefault();
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.control.valueChanges.subscribe(this.changeLength.bind(this))
  }

  changeLength(data: string) {
    if (data != undefined) {
      this.len = data.length;
      if (this.len < this.minLength) {
        this._Class = 'badge-danger';
      }
      else {
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
      return this.config.validations.minLength.value;
    }
    return 0;
  }

  get maxLength() {
    if (this.hasMaxLength) {
      return this.config.validations.maxLength.value;
    }
    return 0;
  }

  get maskConfig() {
    if (this.mask) {
      let mask = this.mask;
      return { mask };
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
    this.conditionClass = changeClass;
  }
  get _Class() {
    return this.conditionClass;
  }
}