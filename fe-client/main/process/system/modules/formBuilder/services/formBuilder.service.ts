import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TextComponent } from '@L3Process/system/modules/formBuilder/components/formElements/text/text.component';
import { NumberComponent } from '@L3Process/system/modules/formBuilder/components/formElements/number/number.component';
import { PasswordComponent } from '@L3Process/system/modules/formBuilder/components/formElements/password/password.component';
import { TextAreaComponent } from '@L3Process/system/modules/formBuilder/components/formElements/textArea/textArea.component';
import { EmailComponent } from '@L3Process/system/modules/formBuilder/components/formElements/email/email.component';
import { PhoneComponent } from '@L3Process/system/modules/formBuilder/components/formElements/phone/phone.component';
import { AddressComponent } from '@L3Process/system/modules/formBuilder/components/formElements/address/address.component';
import { CurrencyComponent } from '@L3Process/system/modules/formBuilder/components/formElements/currency/currency.component';
import { DateTimeComponent } from '@L3Process/system/modules/formBuilder/components/formElements/dateTime/dateTime.component';
import { TimeComponent } from '@L3Process/system/modules/formBuilder/components/formElements/time/time.component';
import { HiddenComponent } from '@L3Process/system/modules/formBuilder/components/formElements/hidden/hidden.component';
import { DateComponent } from '@L3Process/system/modules/formBuilder/components/formElements/date/date.component';
import { MonthComponent } from '@L3Process/system/modules/formBuilder/components/formElements/month/month.component';
import { componentFactoryName } from '@angular/compiler';
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
import { HTMLComponent } from "@L3Process/system/modules/formBuilder/components/formElements/html/html.component";
import { FileComponent } from "@L3Process/system/modules/formBuilder/components/formElements/file/file.component";

@Injectable()
export class FeFormBuilderService {



  referenceArray: Object[];

  basicElements = [
    {
      name: 'input',
     component: TextComponent,
      label: 'Text Field',
      icon: 'title',
      type:'text',
      componentName: 'TextComponent'
    },
    {
      name: 'number',
      component: NumberComponent,
      label: 'Number',
      icon: 'plus_one',
      type:'number',
      componentName: 'NumberComponent'
    },
    {
      name: 'password',
      component: PasswordComponent,
      label: 'Password',
      icon: 'priority_high',
      type:'password',
      componentName: 'PasswordComponent'
    },
    {
      name: 'textarea',
      component: TextAreaComponent,
      label: 'Text Area',
      icon: 'text_format',
      componentName: 'TextAreaComponent'
    },
    {
      name: 'input',
     component: CheckboxComponent,
      label: 'CheckBox',
      icon: 'done',
      componentName: 'CheckboxComponent'
    },
    {
      name: 'input',
      component: RadioComponent,
      label: 'Radio',
      icon: 'radio_button_checked',
      componentName: 'RadioComponent'
    },
    {
      name: 'anchor',
      component: AnchorComponent,
      label: 'Anchor',
      icon: 'code',
      componentName: 'AnchorComponent'
    },
    {
      name: 'Blank',
      component: BlankComponent,
      label: 'Blank',
      icon: 'check_box_outline_blank',
      componentName: 'BlankComponent'
    },
    {
      name: 'hidden',
      component: HiddenComponent,
      label: 'Hidden',
      icon: 'visibility_off',
      componentName: 'HiddenComponent'
    },
    {
      name: 'date',
      component: DateComponent,
      label: 'Date',
      icon: 'date_range',
      componentName: 'DateComponent'
    },
    {
      name: 'month',
      component: MonthComponent,
      label: 'Month',
      icon: 'date_range',
      componentName: 'MonthComponent'
    },
    {
      name: 'button',
      component: ButtonComponent,
      label: 'Button',
      icon: 'send',
      componentName: 'ButtonComponent'
    },
    {
      name: 'select',
     component: SelectComponent,
      label: 'Select',
      icon: 'list',
      componentName: 'SelectComponent'
    },
    {
      name: 'multiselect',
     component: MultiSelectComponent,
      label: 'Multi Select',
      icon: 'list',
      componentName: 'MultiSelectComponent'
    },
    {
      name: 'iconicButton',
     component: IconicButtonComponent,
      label: 'Iconic Button',
      icon: 'send',
      componentName: 'IconicButtonComponent'
    },
    {
      name: 'iconicButton',
      component: FileComponent,
      label: 'File',
      icon: 'cloud_upload',
      componentName: 'FileComponent'
    }
  ];

  advancedElements = [
    {
      name: 'email',
      component: EmailComponent,
      label: 'Email',
      icon: 'email',
      componentName: 'EmailComponent'
    },
    {
      name: 'phone',
      component: PhoneComponent,
      label: 'Phone',
      icon: 'call',
      componentName: 'PhoneComponent'
    },
    {
      name: 'address',
      component: AddressComponent,
      label: 'Address',
      icon: 'location_on',
      componentName: 'AddressComponent'
    },
    {
      name: 'currency',
      component: CurrencyComponent,
      label: 'Currency',
      icon: 'attach_money',
      componentName: 'CurrencyComponent'
    },
    {
      name: 'datettime',
      component: DateTimeComponent,
      label: 'Date/Time',
      icon: 'add_alarm',
      componentName: 'DateTimeComponent'
    },
    {
      name: 'time',
      component: TimeComponent,
      label: 'Time',
      icon: 'access_time',
      componentName: 'TimeComponent'
    },
    {
      name: 'fieldset',
     component: FieldSetComponent,
      label: 'FieldSet',
      icon: 'access_time',
      componentName: 'FieldSetComponent'
    },
    {
      name: 'autocomplete',
     component: FieldSetComponent,
      label: 'Auto Complete',
      icon: 'search',
      componentName: 'AutoCompleteComponent'
    },
    {
      name: 'autocomplete',
     component: HTMLComponent,
      label: 'Rich Text Editor',
      icon: 'title',
      componentName: 'HTMLComponent'
    }
  ];

  layoutElements = [
    
  ];

  component = {
    'TextComponent': {
     component: TextComponent,
      name: 'input',
      type:'text'
    },
    'NumberComponent': {
      name: 'input',
     component: NumberComponent,
      type:'number',
    },
    'PasswordComponent': {
      name: 'input',
     component: PasswordComponent,
      type:'password',
    },
    'TextAreaComponent': {
      name: 'textarea',
      component: TextAreaComponent,
      type:'textarea'
    },
    'HiddenComponent': {
      name: 'input',
     component: HiddenComponent,
      type:'hidden',
    },
    'DateComponent': {
      name: 'input',
     component: DateComponent,
      type:'date',
    },
    'MonthComponent': {
      name: 'input',
     component: MonthComponent,
      type:'month',
    },
    'EmailComponent': {
      name: 'input',
      component: EmailComponent,
      type:'email',
    },
    'PhoneComponent': {
      name: 'input',
     component: PhoneComponent,
      type:'text',
    },
    'AddressComponent': {
      name: 'input',
      component: AddressComponent,
      type:'text',
    },
    'CurrencyComponent': {
      name: 'input',
      component: CurrencyComponent,
      type:'text',
    },
    'DateTimeComponent': {
      name: 'datettime',
      component: DateTimeComponent,
      type:'datetime',
    },
    'TimeComponent': {
      name: 'time',
     component: TimeComponent,
      type:'time'
    },
    'AnchorComponent': {
      name: 'anchor',
     component: AnchorComponent,
      type:'anchor'
    },
    'BlankComponent': {
      name: 'blank',
     component: BlankComponent,
      type:'blank'
    },
    'CheckboxComponent': {
      name: 'checkBox',
     component: CheckboxComponent,
      type:'checkbox'
    },
    'ButtonComponent': {
      name: 'button',
     component: ButtonComponent,
      type:'button'
    },
    'RadioComponent': {
      name: 'radio',
     component: RadioComponent,
      type:'radio'
    },
    'FieldSetComponent': {
      name: 'fieldset',
     component: FieldSetComponent,
      type:'fieldset'
    },
    'SelectComponent': {
      name: 'select',
     component: SelectComponent,
      type:'select'
    },
    'MultiSelectComponent': {
      name: 'multiselect',
     component: MultiSelectComponent,
      type:'multiselect'
    },
    'IconicButtonComponent': {
      name: 'iconicButton',
     component: IconicButtonComponent,
      type:'button'
    },
    'AutoCompleteComponent': {
      name: 'autocomplete',
     component: AutoCompleteComponent,
      type:'text'
    },
    'FileComponent': {
      name: 'autocomplete',
     component: FileComponent,
      type:'text'
    },
    'HTMLComponent': {
      name: 'autocomplete',
     component: HTMLComponent,
      type:'text'
    }

  };

  constructor(public httpClient:HttpClient) { }

  getElementList(elementListToLoad) {
    if (elementListToLoad === 'basic') {
      return this.basicElements;
    }
    if (elementListToLoad === 'advanced') {
      console.log('returning adv')
      return this.advancedElements;
    }
    if (elementListToLoad === 'layoutFields') {
      console.log('returning')
      return this.layoutElements;
    }
  }

  getComponent(name) {
    return this.component[name];
  }

  postData(data) {
    return this.httpClient.post('http://localhost:3000/fe/api/default/save', data)
  }

}
