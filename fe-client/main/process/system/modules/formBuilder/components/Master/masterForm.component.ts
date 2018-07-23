import { FieldControlService } from '@L3Process/system/modules/formBuilder/services/fieldControl.service';
import { Component, ViewEncapsulation, OnInit,
  ComponentFactoryResolver, ViewContainerRef, ViewChild, DoCheck, OnDestroy } from '@angular/core';
import { NgBootstrapService } from '@L3Process/system/services/NgBootstrap.service';
import { NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { builderFieldCompInterface } from './masterForm.interface';
import * as _ from 'lodash';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
import { DefaultsService } from '@L3Process/system/services/Defaults.service';
@Component(
{
  selector: 'form-master',
  templateUrl: './masterForm.component.html',
  styleUrls: ['./masterForm.component.css'],
  encapsulation: ViewEncapsulation.None,
}
)

export class FeMasterFormComponent implements OnInit,  DoCheck , OnDestroy{

  Json = {id: 'FRM000001', name: '',code:'FRM000001',formLabel:'',display:'',hidden: false, disabled: false,conditionalHidden: '', conditionalDisabled: '', active:true, help: '', components: []};
  backupProps;
  componentData = <builderFieldCompInterface>{};
  modalRef: NgbModalRef;
  instance;
  showEdit: boolean;
  currentKey;
  jsonHelp;
  jsonEditorConfig;
  //appliedValidations;
  @ViewChild('preview', {read: ViewContainerRef}) preview: ViewContainerRef;
  constructor(private masterFormService: FormMasterService,
              public fieldControlService: FieldControlService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private formJsonService: FormJsonService,
              private _ngBootstrap: NgBootstrapService,
              protected  _defaults: DefaultsService
    ) {
  }


  ngOnInit() {
    this.modalRef = this.masterFormService.getModalRef();
    const component = this.fieldControlService.getFieldRef().component.component;
    //const component = this.fieldControlService.getFieldRef().viewRef;
    this.createComponentFunc(component);
    this.init();
  }

  ngDoCheck() {
   // this.formJsonService.buildFinalJSON();
    //this.finalJSON = this.formJsonService.getFinalJSON();
  }

  init() {
    this.jsonEditorConfig = {
       mode: 'code', onChange: this.update
    };
    this.jsonHelp = {
        lovHelp: [{
            'code': 'IND',
            'meaning': 'India',
            'tip': 'India'
          }, 
          {
            'code': 'USA',
            'meaning': 'USA',
            'tip': 'USA'
          }]
        ,
        customFuncValidationHelp: 
        {
          yearlimit: {
            validatorFn: " if (control.value !== undefined && (isNaN(control.value.year) || control.value.year < 2010)) { return { 'yearlimit': true }; } return null; ",
            message: 'Year should be greater than 2010'
          },
          agelimit: {
            validatorFn:`if (control.value !== undefined && (isNaN(control.value) || control.value < 50)) { return { 'agelimit': true }; } return null; `,
            message: 'Age should be greater than 50'
          }
        },
        enableCkHelp:
        {

        },
        jsonLogicValHelp: 
        {
          json: {
            "and": [
              { "===": [{ "var": "username.value" }, 'cool'] },
              { "===": [{ "var": "number.value" }, 155] }
            ]
          },
          condition2: 'Error Message.'
      },
      formClassValidationValHelp: {//{valName:'Message'}
        customPattern: {
          message: 'Custom pattern is not correct.',
          validatorFuncName: 'asyncCustomPatternValidator'
        },
        someOtherValidationName: {
          message: 'Error Message',
          validatorFuncName: 'formClassFunctionName'
        }
      },
      eventsHelp: {
        change: {
          handlerOwner: 'form',
          handlerName: '',
          args: "'arg one','arg2' ,'arg 3'"
        },
        focus: {
          handlerOwner: 'resource',
          handlerName: 'onUserNameFocus',
          args: "'arg one','arg2' ,'arg 3'"
        }
      },
      conditionHelp: {
        'simple': {
          "show": true,
          "when": "field-flexilabel",
          "value": 'rathor',
          "operator": '=='
        },
        'advanced': ['var show; return show = controls.number.value == 150 ? true : false;','var show1; return show1 = controls.otherControl.value == 150 ? true : false;'],
        "json": {
          "showCondition": {
            "and": [
              { "===": [{ "var": "username.value" }, 'apple'] },
              { "===": [{ "var": "number.value" }, 15] }
            ]
          },
          "condition1": {
            "and": [
              { "===": [{ "var": "someControl.value" }, 'someValue'] },
              { "===": [{ "var": "someOtherControl.value" }, 'value'] }
            ]
          }
        }
      },
      fldDisabledConditionHelp: {
        'simple': {
          "disable": true,
          "when": "field-flexilabel",
          "value": 'rathor',
          "operator": '=='
        },
        'advanced': ['var disable; return disable = controls.number.value == 150 ? true : false;','var disable; return disable = controls.otherControl.value == 150 ? true : false;'],
        "json": {
          "showCondition": {
            "and": [
              { "===": [{ "var": "username.value" }, 'apple'] },
              { "===": [{ "var": "number.value" }, 15] }
            ]
          },
          "condition1": {
            "and": [
              { "===": [{ "var": "someControl.value" }, 'someValue'] },
              { "===": [{ "var": "someOtherControl.value" }, 'value'] }
            ]
          }
        }
      }
    };
  }

  close() {
    this._ngBootstrap.closeModal( this.modalRef );
  }

  onReset() {
    //this.instance.properties = _.assign({}, this.backupProps);
    //this.componentData = _.assignIn({}, this.backupProps);
   // console.log("Component data in reset", this.componentData);
  }

  onSubmit(form) {
    console.log("Component data in submit", this.componentData);
    form.name = this.instance.fieldControlService.component.name;
    form.type = this.instance.fieldControlService.component.type;
    this.masterFormService.setCurrentKey(this.currentKey);
    this.masterFormService.setProperties(this.instance.properties);
    this.formJsonService.buildFinalJSON();
    this.close();
  }

  createComponentFunc(component) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
       const view = this.preview;
    //console.log("master form view container", view);
    //viewContainerRef.clear();
    const componentRef = view.createComponent(componentFactory, 0, view.injector);
    console.log('master form component ref', componentRef);
    this.instance = componentRef.instance;
    this.currentKey = this.masterFormService.getCurrentKey();
   this.initInstance();
    //view.insert(component);
  }

  initInstance() {
    const propsFromBuilder = this.masterFormService.getProperties(this.currentKey);
    this.instance.showEdit = false;
    this.backupProps = propsFromBuilder;
    this.instance.properties = _.assignIn({}, propsFromBuilder);
    this.componentData = this.instance.properties;
    
  }

  deleteInput(index) {
    this.instance.deleteInput(index);
  }
  
  addInput(event) {
    event.preventDefault();
    this.instance.addInput();
    console.log(this.componentData);
  }

  update(event) {
    console.log(this.componentData);
    console.log('instance props', this.instance.properties);
  }

  ngOnDestroy () {
    this.instance.showEdit = true;
  }

}