import { FieldControlService } from "@L3Process/system/modules/formBuilder/services/fieldControl.service";
import {
  Component,
  ViewEncapsulation,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  DoCheck
} from "@angular/core";
import { NgBootstrapService } from "@L3Process/system/services/NgBootstrap.service";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormMasterService } from "@L3Process/system/modules/formBuilder/services/formMaster.service";
import { builderFieldCompInterface } from "./masterForm.interface";
import * as _ from "lodash";
import { FormJsonService } from "@L3Process/system/modules/formBuilder/services/formJson.service";
import { DefaultsService } from "@L3Process/system/services/defaults.service";
@Component({
  selector: "form-master",
  templateUrl: "./masterForm.component.html",
  styleUrls: ["./masterForm.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class FeMasterFormComponent implements OnInit {
  Json = {
    id: "",
    name: "",
    code: "",
    formLabel: "",
    display: "",
    hidden: false,
    disabled: false,
    conditionalHidden: "",
    conditionalDisabled: "",
    active: true,
    help: "",
    components: []
  };
  backupProps;
  componentData = <builderFieldCompInterface>{};
  modalRef: NgbModalRef;
  instance;
  showEdit: boolean;
  currentKey;
  jsonHelp;
  jsonEditorConfig;

  @ViewChild("preview", { read: ViewContainerRef })
  preview: ViewContainerRef;

  constructor(
    protected _masterFormService: FormMasterService,
    protected _fieldControlService: FieldControlService,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected _formJsonService: FormJsonService,
    protected _ngBootstrap: NgBootstrapService,
    protected _defaults: DefaultsService
  ) {}

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

  _init() {
    this.modalRef = this._masterFormService.getModalRef();
    const component = this._fieldControlService.getFieldRef().component
      .component;
    this._createComponentFunc(component);
    this.jsonEditorConfig = this._defaults.JSON_EDITOR_CONFIG;
    this.jsonHelp = this._defaults.FORM_BUILDER_JSON_HELP;
  }

  close() {
    this._ngBootstrap.closeModal(this.modalRef);
  }

  onReset() {
    console.log("Form reset.");
  }

  onSubmit(form) {
    console.log("Component data in submit", this.componentData);
    form.name = this.instance.fieldControlService.component.name;
    form.type = this.instance.fieldControlService.component.type;
    this._masterFormService.setCurrentKey(this.currentKey);
    this._masterFormService.setProperties(this.instance.properties, this.currentKey);
    this._formJsonService.buildFinalJSON();
    this.close();
  }

  protected _createComponentFunc(component) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      component
    );
    const view = this.preview;
    const componentRef = view.createComponent(
      componentFactory,
      0,
      view.injector
    );
    this.instance = componentRef.instance;
    this._initInstance();
  }

  protected _initInstance() {
    this.currentKey = this._masterFormService.getCurrentKey();
    const propsFromBuilder = this._masterFormService.getProperties(
      this.currentKey
    );
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
  }

  ngOnDestroy() {
    this.instance.showEdit = true;
  }
}
