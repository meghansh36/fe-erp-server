import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormDragComponent } from '@L3Process/system/modules/formBuilder/components/formDrag/formDrag.component';
import { FormBuilderService } from '@L3Process/system/modules/formBuilder/services/formBuilder.service';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { FieldControlService } from '@L3Process/system/modules/formBuilder/services/fieldControl.service';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
import { DndModule } from 'ng2-dnd';
import { FormBuilderComponent } from '@L3Process/system/modules/formBuilder/formBuilder.component';
import { FormBuilderRoutes } from '@L3Process/system/modules/formBuilder/formBuilder.routing';
import { CommonModule } from '@angular/common';
import { MasterFormComponent } from '@L3Process/system/modules/formBuilder/components/Master/masterForm.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { DefaultsService } from '@L3Process/system/services/defaults.service';
import { TextComponent } from '@L3Process/system/modules/formBuilder/components/formElements/text/text.component';
import { TextAreaComponent } from '@L3Process/system/modules/formBuilder/components/formElements/textArea/textArea.component';
import { TimeComponent } from '@L3Process/system/modules/formBuilder/components/formElements/time/time.component';
import { PasswordComponent } from '@L3Process/system/modules/formBuilder/components/formElements/password/password.component';
import { PhoneComponent } from '@L3Process/system/modules/formBuilder/components/formElements/phone/phone.component';
import { NumberComponent } from '@L3Process/system/modules/formBuilder/components/formElements/number/number.component';
import { MonthComponent } from '@L3Process/system/modules/formBuilder/components/formElements/month/month.component';
import { HiddenComponent } from '@L3Process/system/modules/formBuilder/components/formElements/hidden/hidden.component';
import { EmailComponent } from '@L3Process/system/modules/formBuilder/components/formElements/email/email.component';
import { DateTimeComponent } from '@L3Process/system/modules/formBuilder/components/formElements/dateTime/dateTime.component';
import { DateComponent } from '@L3Process/system/modules/formBuilder/components/formElements/date/date.component';
import { CurrencyComponent } from '@L3Process/system/modules/formBuilder/components/formElements/currency/currency.component';
import { AddressComponent } from '@L3Process/system/modules/formBuilder/components/formElements/address/address.component';
import { DragulaModule } from 'ng2-dragula';
import { CheckboxComponent } from '@L3Process/system/modules/formBuilder/components/formElements/checkbox/checkbox.component';
import { AnchorComponent } from '@L3Process/system/modules/formBuilder/components/formElements/anchor/anchor.component';
import { BlankComponent } from '@L3Process/system/modules/formBuilder/components/formElements/blank/blank.component';
import { ButtonComponent } from '@L3Process/system/modules/formBuilder/components/formElements/button/button.component';
import { RadioComponent } from '@L3Process/system/modules/formBuilder/components/formElements/radio/radio.component';
import { FieldSetComponent } from '@L3Process/system/modules/formBuilder/components/formElements/fieldSet/fieldSet.component';
import { SelectComponent } from '@L3Process/system/modules/formBuilder/components/formElements/select/select.component';
import { MultiSelectComponent } from '@L3Process/system/modules/formBuilder/components/formElements/multiSelect/multiSelect.component';
import { IconicButtonComponent } from '@L3Process/system/modules/formBuilder/components/formElements/iconicButton/iconicButton.component';
import { AutoCompleteComponent } from '@L3Process/system/modules/formBuilder/components/formElements/autoComplete/autoComplete.component';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { JSONEditorModule } from 'ngx-jsoneditor';
import { HTMLComponent } from "@L3Process/system/modules/formBuilder/components/formElements/html/html.component";
import { FileComponent } from "@L3Process/system/modules/formBuilder/components/formElements/file/file.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { FormGeneratorModule } from '../../../../../legislations/fe/clients/fe/main/process/system/modules/formGenerator/formGenerator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    FileComponent
  ],
  imports: [
    CommonModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    NgbModule,
    DndModule.forRoot(),
    FormBuilderRoutes,
    FormsModule,
    SortablejsModule.forRoot({ animation: 500 }),
    DragulaModule,
    HttpClientModule,
    ReactiveFormsModule,
    JSONEditorModule,
    TextMaskModule,
    CKEditorModule,
    FormGeneratorModule
  ],
  entryComponents: [TextComponent, TextAreaComponent, TimeComponent, PasswordComponent, PhoneComponent,
                    NumberComponent, MonthComponent, HiddenComponent, EmailComponent, DateTimeComponent,
                    DateComponent, CurrencyComponent, AddressComponent, CheckboxComponent,
                    AnchorComponent, BlankComponent, ButtonComponent, RadioComponent,
                    AutoCompleteComponent, FieldSetComponent, IconicButtonComponent, SelectComponent,
                    MultiSelectComponent, HTMLComponent, FileComponent],
  providers: [FormBuilderService, FormMasterService, FieldControlService, FormJsonService, DefaultsService],
  bootstrap: [FormBuilderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FeFormBuilderModule { }
