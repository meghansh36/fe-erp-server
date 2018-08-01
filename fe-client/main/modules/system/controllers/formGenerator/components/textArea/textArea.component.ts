import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { TextComponent } from '@L3Modules/system/controllers/formGenerator/components/text/text.component';

@Component({
    selector: 'fe-textarea',
    styleUrls: ['./textArea.component.css'],
    templateUrl: './textArea.component.html',
    host: {
        '(keypress)': '_onKeypress($event)',
    }
})
export class FeTextAreaComponent extends TextComponent {
    get spellcheck() {
        return this._config.spellcheck;
    }
    set spellcheck(spellcheck) {
        this._config.spellcheck = spellcheck;
    }
}
