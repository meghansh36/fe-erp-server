import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FeBaseComponent } from '@L1Process/system/modules/formGenerator/components/feBase.component';

@Component({
    selector: 'fe-htmleditor',
    styleUrls: ['./feHtmlEditor.component.css'],
    templateUrl: './feHtmlEditor.component.html',
    host: {
        '(keypress)': '_onKeypress($event)',
    }
})
export class FeHtmlEditorComponent extends FeBaseComponent {
    public length:number = 0;
    name = 'ng2-ckeditor';
    ckeConfig: any;
    mycontent: string = '';
    log: string = '';
 
    _onKeypress(e) {
        if (this.hasMaxLength) {
            const limit = +this.len;
            if (e.target.value.length === this.maxLength) e.preventDefault();
        }
    }
    _onChange(e) {
        if (this.hasMaxLength) {
            console.log(e);
            const limit = +this.len;
            //if (e.target.value.length === this.maxLength) e.preventDefault();
        }
    }

    ngOnInit() {
        super.ngOnInit();
       // this.control.valueChanges.subscribe(this.changeLength.bind(this));
        this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
          };
    }

    /* changeLength(data: string) {
        this.len = data.length;
        if (this.len < this.minLength) {
            this._Class = 'badge-danger';
        }
        else {
            this._Class = 'badge-success';
        }
    } */

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

    set _Class(changeClass) {
        this.conditionClass = changeClass;
    }
    get _Class() {
        return this.conditionClass;
    }
    
}
