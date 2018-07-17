import { FieldControlService } from '@L3Process/system/modules/formBuilder/services/fieldControl.service';
import { Component, ViewEncapsulation, OnInit, DoCheck,
  ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { clearOverrides } from '@angular/core/src/view';
import { builderFieldCompInterface } from './masterForm.interface';
import * as _ from 'lodash';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
@Component(
{
  selector: 'form-master',
  templateUrl: './masterForm.component.html',
  styleUrls: ['./masterForm.component.css'],
  encapsulation: ViewEncapsulation.None,
}
)

export class FeMasterFormComponent implements OnInit,DoCheck,OnDestroy{

  Json = {id: 'FRM000001', name: '',code:'FRM000001',formLabel:'',display:'',components: []};
  // @ViewChild('f')tempData;
  backupProps;
  componentData = <builderFieldCompInterface>{};
  modalRef: NgbModalRef;
  instance;
  showEdit: boolean;
  currentKey;

  @ViewChild('preview', {read: ViewContainerRef}) preview: ViewContainerRef;
  constructor(private modalService: NgbModal, private masterFormService: FormMasterService,
              public fieldControlService: FieldControlService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private formJsonService: FormJsonService
    ) {
    // this.Json.components.push(this.componentData.name);
    // console.log(this.fieldControlService.getFieldRef().ref);
    this.Json.name=this.masterFormService.name;
    this.Json.display=this.masterFormService.display;
    this.Json.formLabel=this.masterFormService.formLabel;


  }

  ngDoCheck() {


  }


  ngOnInit() {
    this.modalRef = this.masterFormService.getModalRef();
    const component = this.fieldControlService.getFieldRef().component.component;
    this.createComponentFunc(component);

  }

  close() {
    this.modalRef.close();
  }

  onReset() {
    this.instance.properties = _.assign({}, this.backupProps);
    this.componentData = _.assignIn({}, this.backupProps);
  }

  onSubmit(form) {

    console.log("after final submit json is ",form);

    form.name = this.instance.fieldControlService.component.name;
    form.type = this.instance.fieldControlService.component.type;
    this.formJsonService.MasterJSON.id=this.Json.id;
    this.formJsonService.MasterJSON.code=this.Json.code;
    this.formJsonService.MasterJSON.name=this.Json.name;
    this.formJsonService.MasterJSON.formLabel=this.Json.formLabel;
    this.formJsonService.MasterJSON.display=this.Json.display;

    this.Json.components.push(form);
    // JSON.stringify(this.Json);


    this.masterFormService.setCurrentKey(this.currentKey);
    //this.masterFormService.setProperties(form);
    this.masterFormService.setProperties(this.instance.properties);
    this.formJsonService.buildFinalJSON();

    this.modalRef.close();
  }

  createComponentFunc(component) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.preview;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.instance = componentRef.instance;
    this.instance.showEdit = false;
    this.currentKey = this.masterFormService.getCurrentKey();
    console.log("master form instance", this.instance);
    const propsFromBuilder = this.masterFormService.getProperties(this.currentKey);
    this.backupProps = propsFromBuilder;
    this.instance.properties = _.assignIn({}, propsFromBuilder);
    this.componentData = _.assignIn({}, this.instance.properties);
  }

  update(event) {

    // if ( !this.componentData.hideLabel) { const masterJSON = this.masterJsonService.getMasterJSON();
    //   this.instance.properties.label = this.componentData.label;
    // } else {
    //   this.instance.properties.label = undefined;
    // }
    // this.instance.properties.suffix = this.componentData.suffix;
    // this.instance.properties.description = this.componentData.description;
    // this.instance.properties.tooltip = this.componentData.tooltip;
    if (this.componentData.hideLabel) {
      this.componentData.label=undefined;
     }
     else
     {
        this.componentData.label=this.componentData.label;
     }
    console.log(this.componentData);
    //this.masterFormService.setProperties(this.componentData);
    this.instance.properties = _.assignIn({}, this.componentData);
    console.log('instance props', this.instance.properties);
  }

  ngOnDestroy() {

    console.log(' destroy called show edit ',this.instance.showEdit);
  }




}
