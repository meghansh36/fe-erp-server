import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormDragComponent } from '@L3Modules/system/controllers/formBuilder/components/formDrag/formDrag.component';
import { FormBuilderService } from '@L3Modules/system/controllers/formBuilder/services/formBuilder.service';
import { FormMasterService } from '@L3Modules/system/controllers/formBuilder/services/formMaster.service';
import { FieldControlService } from '@L3Modules/system/controllers/formBuilder/services/fieldControl.service';
import { FormJsonService } from '@L3Modules/system/controllers/formBuilder/services/formJson.service';

import { FormBuilderComponent } from '@L3Modules/system/controllers/formBuilder/formBuilder.component';
import { FormBuilderRoutes } from '@L3Modules/system/controllers/formBuilder/formBuilder.routing';
import { CommonModule } from '@angular/common';
import { MasterFormComponent } from '@L3Modules/system/controllers/formBuilder/components/Master/masterForm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { DefaultsService } from '@L3Modules/system/services/defaults.service';
import { TextComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/text/text.component';
import { TextAreaComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/textArea/textArea.component';
import { TimeComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/time/time.component';
import { PasswordComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/password/password.component';
import { PhoneComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/phone/phone.component';
import { NumberComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/number/number.component';
import { MonthComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/month/month.component';
import { HiddenComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/hidden/hidden.component';
import { EmailComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/email/email.component';
import { DateTimeComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/dateTime/dateTime.component';
import { DateComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/date/date.component';
import { CurrencyComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/currency/currency.component';
import { AddressComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/address/address.component';
import { DragulaModule } from 'ng2-dragula';
import { CheckboxComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/checkbox/checkbox.component';
import { AnchorComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/anchor/anchor.component';
import { BlankComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/blank/blank.component';
import { ButtonComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/button/button.component';
import { RadioComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/radio/radio.component';
import { FieldSetComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/fieldSet/fieldSet.component';
import { SelectComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/select/select.component';
import { MultiSelectComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/multiSelect/multiSelect.component';
import { IconicButtonComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/iconicButton/iconicButton.component';
import { AutoCompleteComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/autoComplete/autoComplete.component';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { JSONEditorModule } from 'ngx-jsoneditor';
import { HTMLComponent } from "@L3Modules/system/controllers/formBuilder/components/formElements/html/html.component";
import { FileComponent } from "@L3Modules/system/controllers/formBuilder/components/formElements/file/file.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { FormGeneratorModule } from '@L3Modules/system/controllers/formGenerator/formGenerator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectBoxComponent } from '@L3Modules/system/controllers/formBuilder/components/formElements/selectBox/selectBox.component';
import {DpDatePickerModule} from 'ng2-date-picker';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'code',
  optionTextField: 'meaning'
};
@NgModule({
declarations: [
  FormBuilderComponent,
  FormDragComponent,
  MasterFormComponent,
  TextComponent,
  TextAreaComponent,
  TimeComponent,
  PasswordComponent,
  PhoneComponent,
  NumberComponent,
  MonthComponent,
  HiddenComponent,
  EmailComponent,
  DateTimeComponent,
  DateComponent,
  CurrencyComponent,
  AddressComponent,
  CheckboxComponent,
  AnchorComponent,
  BlankComponent,
  ButtonComponent,
  RadioComponent,
  FieldSetComponent,
  SelectComponent,
  MultiSelectComponent,
  IconicButtonComponent,
  AutoCompleteComponent,
  HTMLComponent,
  FileComponent,
  SelectBoxComponent
],
  imports: [
    CommonModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    NgbModule,
    FormBuilderRoutes,
    FormsModule,
    DragulaModule,
    HttpClientModule,
    ReactiveFormsModule,
    JSONEditorModule,
    TextMaskModule,
    CKEditorModule,
    FormGeneratorModule,
    DpDatePickerModule
  ],
  entryComponents: [TextComponent, TextAreaComponent, TimeComponent, PasswordComponent, PhoneComponent,
                    NumberComponent, MonthComponent, HiddenComponent, EmailComponent, DateTimeComponent,
                    DateComponent, CurrencyComponent, AddressComponent, CheckboxComponent,
                    AnchorComponent, BlankComponent, ButtonComponent, RadioComponent,
                    AutoCompleteComponent, FieldSetComponent, IconicButtonComponent, SelectComponent,
                    MultiSelectComponent, HTMLComponent, FileComponent, SelectBoxComponent],
  providers: [FormBuilderService, FormMasterService, FieldControlService, FormJsonService, DefaultsService],
  bootstrap: [FormBuilderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FeFormBuilderModule { }
