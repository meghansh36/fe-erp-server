import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA , ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { DefaultsService } from '@L3Process/system/services/defaults.service';

import { FeFormGeneratorComponent } from '@L1Process/system/modules/formGenerator/formGenerator.component';

import { FieldDirective } from '@L3Process/system/modules/formGenerator/directives/field/field.directive';
import { FormComponent } from '@L3Process/system/modules/formGenerator/components/form/form.component';
import { ButtonComponent } from '@L3Process/system/modules/formGenerator/components/button/button.component';
import { TextComponent } from '@L3Process/system/modules/formGenerator/components/text/text.component';
import { PasswordComponent } from '@L3Process/system/modules/formGenerator/components/password/password.component';
import { TextAreaComponent } from '@L3Process/system/modules/formGenerator/components/textArea/textArea.component';
import { SelectComponent } from '@L3Process/system/modules/formGenerator/components/select/select.component';
import { MultiSelectComponent } from '@L3Process/system/modules/formGenerator/components/multiSelect/multiSelect.component';
import { DateComponent } from '@L3Process/system/modules/formGenerator/components/date/date.component';
import { TimeComponent } from '@L3Process/system/modules/formGenerator/components/time/time.component';
import { AutoCompleteComponent } from '@L3Process/system/modules/formGenerator/components/autoComplete/autoComplete.component';
import { NumberComponent } from '@L3Process/system/modules/formGenerator/components/number/number.component';
import { CheckBoxComponent } from '@L3Process/system/modules/formGenerator/components/checkBox/checkBox.component';
import { RadioComponent } from '@L3Process/system/modules/formGenerator/components/radio/radio.component';
import { FieldSetComponent } from '@L3Process/system/modules/formGenerator/components/fieldSet/fieldSet.component';
import { EmailComponent } from '@L3Process/system/modules/formGenerator/components/email/email.component';
import { FileComponent } from '@L3Process/system/modules/formGenerator/components/file/file.component';
import { HiddenComponent } from '@L3Process/system/modules/formGenerator/components/hidden/hidden.component';
import { MonthComponent } from '@L3Process/system/modules/formGenerator/components/month/month.component';
import { AnchorComponent } from '@L3Process/system/modules/formGenerator/components/anchor/anchor.component';
import { BlankComponent } from '@L3Process/system/modules/formGenerator/components/blank/blank.component';
import { HtmlEditorComponent } from '@L3Process/system/modules/formGenerator/components/htmlEditor/htmlEditor.component';
import { IconicButtonComponent } from '@L3Process/system/modules/formGenerator/components/iconicButton/iconicButton.component';
import { FormButtonsComponent } from '@L3Process/system/modules/formGenerator/components/formButtons/formButton.component';
import { CurrencyComponent } from '@L3Process/system/modules/formGenerator/components/currency/currency.component';
import { PhoneComponent } from '@L3Process/system/modules/formGenerator/components/phone/phone.component';
import { AddressComponent } from '@L3Process/system/modules/formGenerator/components/address/address.component';

import { routesL1 } from '@L1Process/system/modules/formGenerator/formGenerator.routing';

const routing: ModuleWithProviders = RouterModule.forChild(routesL1);


const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'code',
  optionTextField: 'meaning'
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    NgbModule,
    TextMaskModule,
    EditorModule,
    CKEditorModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
  ],
  declarations: [
    FeFormGeneratorComponent,
    FieldDirective,
    FormComponent,
    ButtonComponent,
    TextComponent,
    PasswordComponent,
    SelectComponent,
    TextAreaComponent,
    DateComponent,
    TimeComponent,
    AutoCompleteComponent,
    NumberComponent,
    CheckBoxComponent,
    RadioComponent,
    MultiSelectComponent,
    FieldSetComponent,
    EmailComponent,
    FileComponent,
    HiddenComponent,
    MonthComponent,
    AnchorComponent,
    BlankComponent,
    IconicButtonComponent,
    HtmlEditorComponent,
    FormButtonsComponent,
    CurrencyComponent,
    PhoneComponent,
    AddressComponent
  ],
  exports: [
    FormComponent,
    ButtonComponent,
    TextComponent,
    PasswordComponent,
    SelectComponent,
    TextAreaComponent,
    DateComponent,
    TimeComponent,
    AutoCompleteComponent,
    NumberComponent,
    CheckBoxComponent,
    RadioComponent,
    MultiSelectComponent,
    FieldSetComponent,
    EmailComponent,
    FileComponent,
    FormButtonsComponent,
    CurrencyComponent,
    PhoneComponent,
    AddressComponent,
    HtmlEditorComponent
  ],
  entryComponents: [
    ButtonComponent,
    TextComponent,
    PasswordComponent,
    SelectComponent,
    TextAreaComponent,
    DateComponent,
    TimeComponent,
    AutoCompleteComponent,
    NumberComponent,
    CheckBoxComponent,
    RadioComponent,
    MultiSelectComponent,
    FieldSetComponent,
    EmailComponent,
    FileComponent,
    HiddenComponent,
    MonthComponent,
    AnchorComponent,
    BlankComponent,
    IconicButtonComponent,
    HtmlEditorComponent,
    FormButtonsComponent,
    CurrencyComponent,
    PhoneComponent,
    AddressComponent,
  ],
  providers: [ DefaultsService ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FeFormGeneratorModule {}
