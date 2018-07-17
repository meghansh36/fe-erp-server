import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CKEditorModule } from 'ng2-ckeditor';
//import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';

import { FeFieldDirective } from '@L1Process/system/modules/formGenerator/directives/feField/feField.directive';
import { FeFormComponent } from '@L1Process/system/modules/formGenerator/components/feForm/feForm.component';
import { FeButtonComponent } from '@L1Process/system/modules/formGenerator/components/feButton/feButton.component';
import { FeTextComponent } from '@L1Process/system/modules/formGenerator/components/feText/feText.component';
import { FeTextAreaComponent } from '@L1Process/system/modules/formGenerator/components/feTextArea/feTextArea.component';
import { FeSelectComponent } from '@L1Process/system/modules/formGenerator/components/feSelect/feSelect.component';
import { FeMultiSelectComponent } from '@L1Process/system/modules/formGenerator/components/feMultiSelect/feMultiSelect.component';
import { FeDateComponent } from '@L1Process/system/modules/formGenerator/components/feDate/feDate.component';
import { FeTimeComponent } from '@L1Process/system/modules/formGenerator/components/feTime/feTime.component';
import { FeAutoCompleteComponent } from '@L1Process/system/modules/formGenerator/components/feAutoComplete/feAutoComplete.component';
import { FeNumberComponent } from '@L1Process/system/modules/formGenerator/components/feNumber/feNumber.component';
import { FeCheckBoxComponent } from '@L1Process/system/modules/formGenerator/components/feCheckBox/feCheckBox.component';
import { FeRadioComponent } from '@L1Process/system/modules/formGenerator/components/feRadio/feRadio.component';
import { FeFieldSetComponent } from '@L1Process/system/modules/formGenerator/components/feFieldSet/feFieldSet.component';
import { FeEmailComponent } from '@L1Process/system/modules/formGenerator/components/feEmail/feEmail.component';
import { FeFilComponent } from '@L1Process/system/modules/formGenerator/components/feFile/feFile.component';
import { FeHiddenComponent } from '@L1Process/system/modules/formGenerator/components/feHidden/feHidden.component';
import { FeMonthComponent } from '@L1Process/system/modules/formGenerator/components/feMonth/feMonth.component';
import { FeAnchorComponent } from '@L1Process/system/modules/formGenerator/components/feAnchor/feAnchor.component';
import { FeBlankComponent } from '@L1Process/system/modules/formGenerator/components/feBlank/feBlank.component';
import { FeHtmlEditorComponent } from '@L1Process/system/modules/formGenerator/components/feHtmlEditor/feHtmlEditor.component';
import { FeIconicButtonComponent } from '@L1Process/system/modules/formGenerator/components/feIconicButton/feIconicButton.component';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'code',
  optionTextField: 'meaning'
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TextMaskModule,
    EditorModule,
    CKEditorModule,
    NgxSelectModule.forRoot(CustomSelectOptions)
  ],
  declarations: [
    FeFieldDirective,
    FeFormComponent,
    FeButtonComponent,
    FeTextComponent,
    FeSelectComponent,
    FeTextAreaComponent,
    FeDateComponent,
    FeTimeComponent,
    FeAutoCompleteComponent,
    FeNumberComponent,
    FeCheckBoxComponent,
    FeRadioComponent,
    FeMultiSelectComponent,
    FeFieldSetComponent,
    FeEmailComponent,
    FeFilComponent,
    FeHiddenComponent,
    FeMonthComponent,
    FeAnchorComponent,
    FeBlankComponent,
    FeIconicButtonComponent,
    FeHtmlEditorComponent
  ],
  exports: [
    FeFormComponent,
    FeButtonComponent,
    FeTextComponent,
    FeSelectComponent,
    FeTextAreaComponent,
    FeDateComponent,
    FeTimeComponent,
    FeAutoCompleteComponent,
    FeNumberComponent,
    FeCheckBoxComponent,
    FeRadioComponent,
    FeMultiSelectComponent,
    FeFieldSetComponent,
    FeEmailComponent,
    FeFilComponent
  ],
  entryComponents: [
    FeButtonComponent,
    FeTextComponent,
    FeSelectComponent,
    FeTextAreaComponent,
    FeDateComponent,
    FeTimeComponent,
    FeAutoCompleteComponent,
    FeNumberComponent,
    FeCheckBoxComponent,
    FeRadioComponent,
    FeMultiSelectComponent,
    FeFieldSetComponent,
    FeEmailComponent,
    FeFilComponent,
    FeHiddenComponent,
    FeMonthComponent,
    FeAnchorComponent,
    FeBlankComponent,
    FeIconicButtonComponent,
    FeHtmlEditorComponent
  ]
})
export class FormGeneratorModule {}
