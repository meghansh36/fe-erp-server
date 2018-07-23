import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';
import { NumComponent } from '@L3Process/system/modules/formBuilder/components/formElements/num/num.component';
import { PwdComponent } from '@L3Process/system/modules/formBuilder/components/formElements/pwd/pwd.component';
import { TxaComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txa/txa.component';
import { EmlComponent } from '@L3Process/system/modules/formBuilder/components/formElements/eml/eml.component';
import { PhnComponent } from '@L3Process/system/modules/formBuilder/components/formElements/phn/phn.component';
import { AdrComponent } from '@L3Process/system/modules/formBuilder/components/formElements/adr/adr.component';
import { CurComponent } from '@L3Process/system/modules/formBuilder/components/formElements/cur/cur.component';
import { DtiComponent } from '@L3Process/system/modules/formBuilder/components/formElements/dti/dti.component';
import { TimComponent } from '@L3Process/system/modules/formBuilder/components/formElements/tim/tim.component';
import { HidComponent } from '@L3Process/system/modules/formBuilder/components/formElements/hid/hid.component';
import { DatComponent } from '@L3Process/system/modules/formBuilder/components/formElements/dat/dat.component';
import { MonComponent } from '@L3Process/system/modules/formBuilder/components/formElements/mon/mon.component';
import { componentFactoryName } from '@angular/compiler';
import { ChkComponent } from '@L3Process/system/modules/formBuilder/components/formElements/chk/chk.component';
import { AncComponent } from '@L3Process/system/modules/formBuilder/components/formElements/anc/anc.component';
import { BlkComponent } from '@L3Process/system/modules/formBuilder/components/formElements/blk/blk.component';
import { BtnComponent } from '@L3Process/system/modules/formBuilder/components/formElements/btn/btn.component';
import { RadComponent } from '@L3Process/system/modules/formBuilder/components/formElements/rad/rad.component';
import { FstComponent } from '@L3Process/system/modules/formBuilder/components/formElements/fst/fst.component';
import { SelComponent } from '@L3Process/system/modules/formBuilder/components/formElements/sel/sel.component';
import { MslComponent } from '@L3Process/system/modules/formBuilder/components/formElements/msl/msl.component';
import { IcbComponent } from '@L3Process/system/modules/formBuilder/components/formElements/icb/icb.component';
import { AcsComponent } from '@L3Process/system/modules/formBuilder/components/formElements/acs/acs.component';
import { HTMLComponent } from "@L3Process/system/modules/formBuilder/components/formElements/html/html.component";
import { FileComponent } from "@L3Process/system/modules/formBuilder/components/formElements/file/file.component";

@Injectable()
export class FeFormBuilderService {



  referenceArray: Object[];

  basicElements = [
    {
      name: 'input',
     component: TxtComponent,
      label: 'Text Field',
      icon: 'title',
      type:'text',
      componentName: 'TxtComponent'
    },
    {
      name: 'number',
      component: NumComponent,
      label: 'Number',
      icon: 'plus_one',
      type:'number',
      componentName: 'NumComponent'
    },
    {
      name: 'password',
      component: PwdComponent,
      label: 'Password',
      icon: 'priority_high',
      type:'password',
      componentName: 'PwdComponent'
    },
    {
      name: 'textarea',
      component: TxaComponent,
      label: 'Text Area',
      icon: 'text_format',
      componentName: 'TxaComponent'
    },
    {
      name: 'input',
     component: ChkComponent,
      label: 'CheckBox',
      icon: 'done',
      componentName: 'ChkComponent'
    },
    {
      name: 'input',
      component: RadComponent,
      label: 'Radio',
      icon: 'radio_button_checked',
      componentName: 'RadComponent'
    },
    {
      name: 'anchor',
      component: AncComponent,
      label: 'Anchor',
      icon: 'code',
      componentName: 'AncComponent'
    },
    {
      name: 'Blank',
      component: BlkComponent,
      label: 'Blank',
      icon: 'check_box_outline_blank',
      componentName: 'BlkComponent'
    },
    {
      name: 'hidden',
      component: HidComponent,
      label: 'Hidden',
      icon: 'visibility_off',
      componentName: 'HidComponent'
    },
    {
      name: 'date',
      component: DatComponent,
      label: 'Date',
      icon: 'date_range',
      componentName: 'DatComponent'
    },
    {
      name: 'month',
      component: MonComponent,
      label: 'Month',
      icon: 'date_range',
      componentName: 'MonComponent'
    },
    {
      name: 'button',
      component: BtnComponent,
      label: 'Button',
      icon: 'send',
      componentName: 'BtnComponent'
    },
    {
      name: 'select',
     component: SelComponent,
      label: 'Select',
      icon: 'list',
      componentName: 'SelComponent'
    },
    {
      name: 'multiselect',
     component: MslComponent,
      label: 'Multi Select',
      icon: 'list',
      componentName: 'MslComponent'
    },
    {
      name: 'iconicButton',
     component: IcbComponent,
      label: 'Iconic Button',
      icon: 'send',
      componentName: 'IcbComponent'
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
      component: EmlComponent,
      label: 'Email',
      icon: 'email',
      componentName: 'EmlComponent'
    },
    {
      name: 'phone',
      component: PhnComponent,
      label: 'Phone',
      icon: 'call',
      componentName: 'PhnComponent'
    },
    {
      name: 'address',
      component: AdrComponent,
      label: 'Address',
      icon: 'location_on',
      componentName: 'AdrComponent'
    },
    {
      name: 'currency',
      component: CurComponent,
      label: 'Currency',
      icon: 'attach_money',
      componentName: 'CurComponent'
    },
    {
      name: 'datettime',
      component: DtiComponent,
      label: 'Date/Time',
      icon: 'add_alarm',
      componentName: 'DtiComponent'
    },
    {
      name: 'time',
      component: TimComponent,
      label: 'Time',
      icon: 'access_time',
      componentName: 'TimComponent'
    },
    {
      name: 'fieldset',
     component: FstComponent,
      label: 'FieldSet',
      icon: 'access_time',
      componentName: 'FstComponent'
    },
    {
      name: 'autocomplete',
     component: FstComponent,
      label: 'Auto Complete',
      icon: 'search',
      componentName: 'AcsComponent'
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
    'TxtComponent': {
     component: TxtComponent,
      name: 'input',
      type:'text'
    },
    'NumComponent': {
      name: 'input',
     component: NumComponent,
      type:'number',
    },
    'PwdComponent': {
      name: 'input',
     component: PwdComponent,
      type:'password',
    },
    'TxaComponent': {
      name: 'textarea',
      component: TxaComponent,
      type:'textarea'
    },
    'HidComponent': {
      name: 'input',
     component: HidComponent,
      type:'hidden',
    },
    'DatComponent': {
      name: 'input',
     component: DatComponent,
      type:'date',
    },
    'MonComponent': {
      name: 'input',
     component: MonComponent,
      type:'month',
    },
    'EmlComponent': {
      name: 'input',
      component: EmlComponent,
      type:'email',
    },
    'PhnComponent': {
      name: 'input',
     component: PhnComponent,
      type:'text',
    },
    'AdrComponent': {
      name: 'input',
      component: AdrComponent,
      type:'text',
    },
    'CurComponent': {
      name: 'input',
      component: CurComponent,
      type:'text',
    },
    'DtiComponent': {
      name: 'datettime',
      component: DtiComponent,
      type:'datetime',
    },
    'TimComponent': {
      name: 'time',
     component: TimComponent,
      type:'time'
    },
    'AncComponent': {
      name: 'anchor',
     component: AncComponent,
      type:'anchor'
    },
    'BlkComponent': {
      name: 'blank',
     component: BlkComponent,
      type:'blank'
    },
    'ChkComponent': {
      name: 'checkBox',
     component: ChkComponent,
      type:'checkbox'
    },
    'BtnComponent': {
      name: 'button',
     component: BtnComponent,
      type:'button'
    },
    'RadComponent': {
      name: 'radio',
     component: RadComponent,
      type:'radio'
    },
    'FstComponent': {
      name: 'fieldset',
     component: FstComponent,
      type:'fieldset'
    },
    'SelComponent': {
      name: 'select',
     component: SelComponent,
      type:'select'
    },
    'MslComponent': {
      name: 'multiselect',
     component: MslComponent,
      type:'multiselect'
    },
    'IcbComponent': {
      name: 'iconicButton',
     component: IcbComponent,
      type:'button'
    },
    'AcsComponent': {
      name: 'autocomplete',
     component: AcsComponent,
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
