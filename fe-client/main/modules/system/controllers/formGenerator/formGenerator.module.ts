import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA , ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { DefaultsService } from '@L3Modules/system/services/defaults.service';

import { FormGeneratorComponent } from '@L3Modules/system/controllers/formGenerator/formGenerator.component';

import { FieldDirective } from '@L3Modules/system/controllers/formGenerator/directives/field/field.directive';
import { FormComponent } from '@L3Modules/system/controllers/formGenerator/components/form/form.component';
import { ButtonComponent } from '@L3Modules/system/controllers/formGenerator/components/button/button.component';
import { TextComponent } from '@L3Modules/system/controllers/formGenerator/components/text/text.component';
import { PasswordComponent } from '@L3Modules/system/controllers/formGenerator/components/password/password.component';
import { TextAreaComponent } from '@L3Modules/system/controllers/formGenerator/components/textArea/textArea.component';
import { SelectComponent } from '@L3Modules/system/controllers/formGenerator/components/select/select.component';
import { MultiSelectComponent } from '@L3Modules/system/controllers/formGenerator/components/multiSelect/multiSelect.component';
import { DateComponent } from '@L3Modules/system/controllers/formGenerator/components/date/date.component';
import { TimeComponent } from '@L3Modules/system/controllers/formGenerator/components/time/time.component';
import { AutoCompleteComponent } from '@L3Modules/system/controllers/formGenerator/components/autoComplete/autoComplete.component';
import { NumberComponent } from '@L3Modules/system/controllers/formGenerator/components/number/number.component';
import { CheckBoxComponent } from '@L3Modules/system/controllers/formGenerator/components/checkBox/checkBox.component';
import { RadioComponent } from '@L3Modules/system/controllers/formGenerator/components/radio/radio.component';
import { FieldSetComponent } from '@L3Modules/system/controllers/formGenerator/components/fieldSet/fieldSet.component';
import { EmailComponent } from '@L3Modules/system/controllers/formGenerator/components/email/email.component';
import { FileComponent } from '@L3Modules/system/controllers/formGenerator/components/file/file.component';
import { HiddenComponent } from '@L3Modules/system/controllers/formGenerator/components/hidden/hidden.component';
import { MonthComponent } from '@L3Modules/system/controllers/formGenerator/components/month/month.component';
import { AnchorComponent } from '@L3Modules/system/controllers/formGenerator/components/anchor/anchor.component';
import { BlankComponent } from '@L3Modules/system/controllers/formGenerator/components/blank/blank.component';
import { HtmlEditorComponent } from '@L3Modules/system/controllers/formGenerator/components/htmlEditor/htmlEditor.component';
import { IconicButtonComponent } from '@L3Modules/system/controllers/formGenerator/components/iconicButton/iconicButton.component';
import { FormButtonsComponent } from '@L3Modules/system/controllers/formGenerator/components/formButtons/formButton.component';
import { CurrencyComponent } from '@L3Modules/system/controllers/formGenerator/components/currency/currency.component';
import { PhoneComponent } from '@L3Modules/system/controllers/formGenerator/components/phone/phone.component';
import { AddressComponent } from '@L3Modules/system/controllers/formGenerator/components/address/address.component';
import { DateTimeComponent } from '@L3Modules/system/controllers/formGenerator/components/dateTime/dateTime.component';
import { SelectBoxComponent } from "@L3Modules/system/controllers/formGenerator/components/selectBox/selectBox.component";
import {DpDatePickerModule} from 'ng2-date-picker';
import { routes } from '@L3Modules/system/controllers/formGenerator/formGenerator.routing';

const routing: ModuleWithProviders = RouterModule.forChild(routes);


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
    DpDatePickerModule
  ],
  declarations: [
    FormGeneratorComponent,
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
	AddressComponent,
	DateTimeComponent,
	SelectBoxComponent
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
	HtmlEditorComponent,
	DateTimeComponent,
	SelectBoxComponent
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
	DateTimeComponent,
	SelectBoxComponent

  ],
  providers: [ DefaultsService ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class FeFormGeneratorModule {}
