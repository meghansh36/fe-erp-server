/*
 *@Component Description
 *This the form properties modal component.
*/

import { FieldControlService } from "@L3Modules/system/controllers/formBuilder/services/fieldControl.service";
import {
  Component,
  ViewEncapsulation,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild

} from "@angular/core";
import { NgBootstrapService } from "@L3Modules/system/services/NgBootstrap.service";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormMasterService } from "@L3Modules/system/controllers/formBuilder/services/formMaster.service";
import { builderFieldCompInterface } from "./masterForm.interface";
import * as _ from "lodash";
import { FormJsonService } from "@L3Modules/system/controllers/formBuilder/services/formJson.service";
import { DefaultsService } from "@L3Modules/system/services/defaults.service";
import { FormBuilderService } from "@L3Modules/system/controllers/formBuilder/services/formBuilder.service";
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
  backupProps; // used to set backup properties. used in reset
  componentData = <builderFieldCompInterface>{}; // bound to ngModel
  modalRef: NgbModalRef; // modalRef returned by bootstrap
  instance; // copy of instance of the the preview component created
  showEdit: boolean; // true/false to display field toolbar 
  currentKey; // key of component
  jsonHelp;
  jsonEditorConfig; // configs for json editor

  // ng-template reference of the Preview component container
  @ViewChild('preview', { read: ViewContainerRef })
  preview: ViewContainerRef;

  constructor(
    protected _masterFormService: FormMasterService,
    protected _fieldControlService: FieldControlService,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected _formJsonService: FormJsonService,
    protected _ngBootstrap: NgBootstrapService,
    protected _defaults: DefaultsService,
    protected _formBuilderService: FormBuilderService
  ) {}

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

 /*
  * @function Description
  *
  * This function initializes the jsoneditor properties and also calls the createComponentFunc()
  * which creates the preview component.
  */
  _init() {
    // set modalRef from service (used to close the modal)
    this.modalRef = this._masterFormService.getModalRef();
    // Get component name from the fieldControl service
    const componentName = this._fieldControlService.getFieldRef().component;
    // get component class from formBuilder service
    const component = this._formBuilderService.getComponent(componentName).component;
    // call create component function
    this._createComponentFunc(component);
    // set json editor properties
    this.jsonEditorConfig = this._defaults.JSON_EDITOR_CONFIG;
    this.jsonHelp = this._defaults.FORM_BUILDER_JSON_HELP;
  }

 /* @function Description
  *
  * Function fires on click event. Closes the modal.
  */
  close() {
    this._ngBootstrap.closeModal(this.modalRef);
  }

 /* @function Description
  *
  * Function fires on click event. Resets form properties from backup props.
  */
  onReset() {
    //this.instance.properties = this.backupProps;
    this.componentData = this.backupProps;

  }

 /* @function Description
  *
  * function fires on click event. Saves the field properties in the MasterJSON
  */
  onSubmit(form) {
    //form.name = this.instance.fieldControlService.component.name;
    //form.type = this.instance.fieldControlService.component.type;

    this._masterFormService.setCurrentKey(this.currentKey);
    this._masterFormService.setProperties(this.instance.properties, this.currentKey);
    this._formJsonService.buildFinalJSON();
    this.close();
  }

 /* @function Description
  * Arguments ==> component - class of the component to be shown in the preview window.
  *
  * This function creates a new component.
  */
  protected _createComponentFunc(component) {
    // create componentFactory
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      component
    );
    // get ng-template ref for preview container.
    const view = this.preview;
    // angular function to create a dynamic component.
    const componentRef = view.createComponent(
      componentFactory,
      0,
      view.injector
    );
    // store the instance of the new component in a variable.
    this.instance = componentRef.instance;
    this._initInstance();
  }

 /* @function Description
  *
  * This function sets the properites of the newly created component.
  */
  protected _initInstance() {
    // get the key from service.
    this.currentKey = this._masterFormService.getCurrentKey();
    // get properties from masterJSON
    const propsFromBuilder = this._masterFormService.getProperties(
      this.currentKey
    );
    // set showEdit to false. Disables the field toolbar in the preview window.
    this.instance.showEdit = false;
    // create a backup of the properties for reset.
    this.backupProps = propsFromBuilder;
    // set field properties
    this.instance.properties = _.assignIn({}, propsFromBuilder);
    // bind ngModel to the instance properties
    this.componentData = this.instance.properties;
  }

}
