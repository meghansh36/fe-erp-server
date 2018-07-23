import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { BaseComponent } from '@L3Process/system/modules/formGenerator/components/base.component';

@Component({
    selector: 'fe-textarea',
    styleUrls: ['./textArea.component.css'],
    templateUrl: './textArea.component.html',
    host: {
        '(keypress)': '_onKeypress($event)',
    }
})
export class FeTextAreaComponent extends BaseComponent {
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
    
    get len() {
        return this.length;
    }
    set len(len) {
        this.length = len;
    }

    get spellcheck() {
        return this._config.spellcheck;
    }
    set spellcheck(spellcheck) {
        this._config.spellcheck = spellcheck;
    }

    set _Class(changeClass) {
        this.conditionClass = changeClass;
    }
    get _Class() {
        return this.conditionClass;
    }

}
