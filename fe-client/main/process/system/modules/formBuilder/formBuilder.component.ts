import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  DoCheck,
  Renderer2,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { NgBootstrapService } from "@L3Process/system/services/NgBootstrap.service";
import { FormMasterService } from "@L3Process/system/modules/formBuilder/services/formMaster.service";
import { FieldControlService } from "@L3Process/system/modules/formBuilder/services/fieldControl.service";
import { FormJsonService } from "@L3Process/system/modules/formBuilder/services/formJson.service";
import { DragulaService } from "ng2-dragula";
import { FormBuilderService } from "@L3Process/system/modules/formBuilder/services/formBuilder.service";
import * as _ from "lodash";
import { MasterFormComponent } from "@L3Process/system/modules/formBuilder/components/Master/masterForm.component";
import { reject } from "q";

@Component({
  selector: "form-builder",
  templateUrl: "./formBuilder.component.html",
  styleUrls: ["./formBuilder.component.css"]
})
export class FeFormBuilderComponent implements DoCheck, OnInit, AfterViewInit {

  @ViewChild('host', { read: ViewContainerRef }) host: ViewContainerRef;
  @ViewChild('buttonHost', { read: ViewContainerRef }) buttonHost: ViewContainerRef;
  @ViewChild('content') content;
  @ViewChild('preview') preview;
  cond: Boolean = false;
  basic: String = "basic";
  advanced: String = "advanced";
  modalRef: any;

  rootDrop: any;
  component: any;
  finalJSON;
  formJson: any;
  jsonEditorConfig;
  DOMArray: any = [];
  protected _dragulaObservable$: any;

  public formJsonHelp;

  constructor(
    protected _bootstrapService: NgBootstrapService,
    protected _masterFormService: FormMasterService,
    protected _componentFactoryResolver: ComponentFactoryResolver,
    protected _fieldControlService: FieldControlService,
    protected _formJsonService: FormJsonService,
    protected _dragulaService: DragulaService,
    protected _formBuilderService: FormBuilderService,
    protected _renderer: Renderer2
  ) {
    this._initialize();
  }

  protected _initialize() {
    this.formJson = this._formJsonService.MasterJSON;
    this._setDragulaOptions();
    this._dragulaService.drop.subscribe(this._onComponentDrop.bind(this));
  }

  protected _setDragulaOptions() {
    this._dragulaService.setOptions("bag-one", {
      revertOnSpill: true,
      copy: function(el, source) {
        return source.id === "not_copy";
      },
      accepts: function(el, target, source, sibling) {
        const targetClassesArr = target.className.trim().split(" ");
        const fieldClassesArr = el.className.trim().split(" ");
        if (
          _.includes(targetClassesArr, "buttonDropZone") &&
          (_.includes(fieldClassesArr, "button") ||
            _.includes(fieldClassesArr, "button-input"))
        ) {
          return true;
        } else if (
          _.includes(targetClassesArr, "FSTdropZone") ||
          _.includes(targetClassesArr, "customDropZone")
        ) {
          return true;
        }
      }
    });
  }

  protected _onComponentDrop(value) {
    if (this.rootDrop === undefined) {
      this.rootDrop = value[2];
    }
    if (value[1].nodeName === "LI") {
      const componentName = value[1].attributes.getNamedItem("componentName")
        .nodeValue;
      const index = this.calculateIndex(value);
      value[1].remove();
      this.dropComplete(
        this._formBuilderService.getComponent(componentName),
        index,
        value
      );
    } else {
      const newIndex = this.calculateIndex(value);
      value[1].parentComponent = value[2].id;
      this._formJsonService.updateMasterJSONOnMove(
        value[2],
        value[3],
        value[1],
        newIndex
      );
    }
  }

  protected _beforeNgDoCheck() {}

  ngDoCheck() {
    this._beforeNgDoCheck();
    this._formJsonService.buildFinalJSON();
    this.finalJSON = this._formJsonService.getFinalJSON();
    this._afterNgDoCheck();
  }

  protected _afterNgDoCheck() {}

  onHidden() {
    this.hideFields(this.hidden);
  }

  onDisabled() {
    this.disableFields(this.disabled);
  }

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

  ngAfterViewInit() {
    this.applyDisplayProps();
  }

  update(event) {}

  _init() {
    this.jsonEditorConfig = {
      mode: "code",
      onChange: this.update
    };
    this.initFormJsonHelp();
  }

  applyDisplayProps() {
    this.disableFields(this.disabled);
    this.hideFields(this.hidden);
  }

  disableFields(disableFlag) {
    const fieldComponents = this.components;
    for (let keyRef in fieldComponents) {
      const componentInstance = fieldComponents[keyRef].instance;
      componentInstance.formDisabled = disableFlag;
    }
  }

  hideFields(hiddenFlag) {
    const fieldComponents = this.components;
    for (let keyRef in fieldComponents) {
      const componentInstance = fieldComponents[keyRef].instance;
      componentInstance.formHidden = hiddenFlag;
    }
  }

  initFormJsonHelp() {
    this.formJsonHelp = {
      show: {
        simple: {
          show: true,
          when: "field-flexilabel",
          value: "rathor",
          operator: "=="
        },
        advanced: [
          "var show; return show = controls.number.value == 150 ? true : false;",
          "var show1; return show1 = controls.otherControl.value == 150 ? true : false;"
        ],
        json: {
          condition: {
            and: [
              { "===": [{ var: "username.value" }, "apple"] },
              { "===": [{ var: "number.value" }, 15] }
            ]
          },
          condition1: {
            and: [
              { "===": [{ var: "someControl.value" }, "someValue"] },
              { "===": [{ var: "someOtherControl.value" }, "value"] }
            ]
          }
        }
      },
      disable: {
        simple: {
          disable: true,
          when: "field-flexilabel",
          value: "rathor",
          operator: "=="
        },
        advanced: [
          "var show; return show = controls.number.value == 150 ? true : false;",
          "var show1; return show1 = controls.otherControl.value == 150 ? true : false;"
        ],
        json: {
          condition: {
            and: [
              { "===": [{ var: "username.value" }, "apple"] },
              { "===": [{ var: "number.value" }, 15] }
            ]
          },
          condition1: {
            and: [
              { "===": [{ var: "someControl.value" }, "someValue"] },
              { "===": [{ var: "someOtherControl.value" }, "value"] }
            ]
          }
        }
      }
    };
  }

  calculateIndex(value) {
    const [bag, el, target, source, sibling] = value;
    const children = target.children;
    console.log(value);
    if (sibling === null) {
      return children.length - 1;
    } else {
      return Array.prototype.indexOf.call(children, sibling) - 1;
    }
  }

  dropComplete(componentObj, index, value) {
    this.createComponentFunc(componentObj, index, value[2], value);
    //this.openModal();
  }

  openModal() {
    this.modalRef = this._bootstrapService.openModal(this.content, {
      size: "lg"
    });
    this._masterFormService.setModalRef(this.modalRef);
  }

  openFormSettingModal(content) {
    this._bootstrapService.openModal(content, { size: "lg" });
  }

  generateNewKey() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  moveDOMNode(parent, nextSibling, el) {
    parent.insertBefore(el, nextSibling);
  }

  createComponentFunc(componentObj, index, target, value) {
    const key = this.generateNewKey();
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      componentObj.component
    );
    this._masterFormService.setCurrentKey(key);
    let viewContainerRef;
    const targetClassesArr = target.className.trim().split(" ");
    if (_.includes(targetClassesArr, "FSTdropZone")) {
      viewContainerRef = this._fieldControlService.getFstCollection(target.id);
    } else if (_.includes(targetClassesArr, "buttonDropZone")) {
      viewContainerRef = this.buttonHost;
    } else {
      viewContainerRef = this.host;
    }

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.moveDOMNode(target, value[4], componentRef.location.nativeElement);
    this._fieldControlService.setFieldRef(componentRef, this, componentObj);
    this._formJsonService.addComponentToMasterJSON(
      key,
      componentRef,
      target.id,
      index
    );
    target.children[index].generatedKey = key;
    target.children[index].parentComponent = target.id;
    this._formJsonService.updateMasterJSONOnDrop(target, key, false);
    //this._formJsonService.buildFinalJSON();
    //console.log(this._formJsonService.getMasterJSON());
  }

  createComponentsFromJSON(componentProps) {
    return new Promise((res, rej) => {
      const copy = _.assign({}, componentProps);

      const key = copy.key;
      this._masterFormService.setCurrentKey(key);
      const parentID = copy.parent;
      let viewContainerRef;
      if (parentID === "root_drop") {
        viewContainerRef = this.host;
        if (copy.componentName === 'FieldSetComponent') {
          copy.components = [];
        }
      } else if (parentID === 'button_drop') {
        viewContainerRef = this.buttonHost;
      } else {
        viewContainerRef = this._fieldControlService.getFstCollection(parentID);
      }
      const component = this._formBuilderService.getComponent(
        componentProps.componentName
      ).component;

      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        component
      );

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.properties = copy;
      this._fieldControlService.setFieldRef(componentRef, this, { component });
      this._formJsonService.addComponentToMasterJSON(
        key,
        componentRef,
        componentProps.parent,
        componentProps.order
      );
      const target: any = document.querySelector(`#${componentProps.parent}`);
      target.children[componentProps.order].generatedKey = key;
      target.children[componentProps.order].parentComponent = target.id;
      setTimeout(() => {
        res();
      }, 10);
    });
  }

  async populateFormBuilder(components) {
    console.log('input compProps', components);
    for (let i = 0; i < components.length; i++) {
      await this.createComponentsFromJSON(components[i]);
      if (components[i].components !== undefined) {
        this.populateFormBuilder(components[i].components);
      }
    }
    return;
  }

  runBuilder() {
    this.host.clear();
    this.buttonHost.clear();

    const json = {
      id: "",
      code: "",
      formLabel: "",
      name: "",
      type: "",
      disabled: false,
      hidden: false,
      disableCondition: "",
      showCondition: "",
      active: true,
      help: "",
      components: [
        {
          "type": "TXT",
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "",
          "appliedValidations": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_olx5769z5",
          "order": 0,
          "parent": "root_drop",
          "componentName": "TxtComponent"
        },
        {
          "useDelimeter": true,
          "requiredDecimal": true,
          "type": "NUM",
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "",
          "appliedValidations": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_flugnqddb",
          "order": 1,
          "parent": "root_drop",
          "componentName": "NumComponent"
        },
        {
          "type": "PWD",
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "",
          "appliedValidations": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_fyl14ecjs",
          "order": 2,
          "parent": "root_drop",
          "componentName": "PwdComponent"
        },
        {
          "enableSpellCheck": true,
          "rows": 5,
          "type": "TXA",
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "",
          "appliedValidations": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_ikx9hkwn9",
          "order": 3,
          "parent": "root_drop",
          "componentName": "TxaComponent"
        },
        {
          "type": "CHK",
          "inputPropsArray": [
            {
              "label": "test",
              "value": ""
            }
          ],
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "",
          "appliedValidations": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_vu7dogsy6",
          "order": 4,
          "parent": "root_drop",
          "componentName": "ChkComponent"
        },
        {
          "inputPropsArray": [
            {
              "label": "test",
              "value": ""
            }
          ],
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "",
          "appliedValidations": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "type": "CHK",
          "key": "_5l4bq2dl2",
          "order": 5,
          "parent": "root_drop",
          "componentName": "RadComponent"
        }
      ],
      buttons: []
    };
    this.populateFormBuilder(json.components);
    //this._formJsonService.buildFinalJSON();
  }

  save() {
    this._formBuilderService.postData(this.finalJSON).subscribe(
      res => {
        alert("data received");
      },
      err => {
        console.log("getting error", err);
      }
    );
  }

  reset() {}

  renderPreview() {
    this.finalJSON = this._formJsonService.buildFinalJSON();
    this._bootstrapService.openModal(this.preview, { size: 'lg' });
  }

  get id() {
    return this.formJson.id;
  }

  get code() {
    return this.formJson.code;
  }

  get formLabel() {
    return this.formJson.formLabel;
  }

  get name() {
    return this.formJson.name;
  }

  get display() {
    return this.formJson.display;
  }

  get disabled() {
    return this.formJson.disabled;
  }

  get hidden() {
    return this.formJson.hidden;
  }

  get conditionalHidden() {
    return this.formJson.conditionalHidden;
  }

  get conditionalDisabled() {
    return this.formJson.conditionalDisabled;
  }

  get active() {
    return this.formJson.active;
  }

  get help() {
    return this.formJson.help;
  }

  get components() {
    return this.formJson.components;
  }

  set id(id) {
    this.formJson.id = id;
  }

  set code(code) {
    this.formJson.code = code;
  }

  set formLabel(formLabel) {
    this.formJson.formLabel = formLabel;
  }

  set name(name) {
    this.formJson.name = name;
  }

  set display(display) {
    this.formJson.display = display;
  }

  set disabled(disabled) {
    this.formJson.disabled = disabled;
  }

  set hidden(hidden) {
    this.formJson.hidden = hidden;
  }

  set conditionalHidden(conditionalHidden) {
    this.formJson.conditionalHidden = conditionalHidden;
  }

  set conditionalDisabled(conditionalDisabled) {
    this.formJson.conditionalDisabled = conditionalDisabled;
  }

  set active(active) {
    this.formJson.active = active;
  }

  set help(help) {
    this.formJson.help = help;
  }

  set components(components) {
    this.formJson.components = components;
  }
}
