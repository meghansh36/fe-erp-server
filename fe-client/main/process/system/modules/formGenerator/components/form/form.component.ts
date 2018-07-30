import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { DependentService } from "@L3Process/system/modules/formGenerator/services/dependent.service";
import { FieldConfig } from "@L1Process/system/modules/formGenerator/models/field-config.interface";
import * as jsonLogic from "json-logic-js";
import { UtilityService } from "@L3Process/system/services/utility.service";
import * as _ from "lodash";

@Component({
  exportAs: "feForm",
  selector: "feForm",
  styleUrls: ["form.component.css"],
  templateUrl: "form.component.html"
})
export class FeFormComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() schema: any;

  @Input() formInstance?: any;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("formHelp", { read: ViewContainerRef })
  helpContainer: ViewContainerRef;

  group: FormGroup;
  instance: any;
  componentInstances: any;
  components: FieldConfig[] = [];
  protected _$simpleConditionChange: any;
  protected _$groupValueChange: any[] = [];
  protected _$simpleHideConditonChange: any;
  protected _$simpleDisableConditionChange: any;
  protected _schema: any;
  protected _buttons: any;

  protected _disableConditionFlags: boolean[] = [];
  protected _hideConditionFlags: boolean[] = [];

  constructor(
    protected _fb: FormBuilder,
    protected _dependent: DependentService,
    protected _renderer: Renderer2,
    protected _eleRef: ElementRef,
    protected _utility: UtilityService
  ) {
    this.instance = this;
    this.componentInstances = [];
  }

  protected _beforeNgOnInit() { }

  protected _afterNgOnInit() { }

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

  protected _init() {
    this.group = this._fb.group({});
    if (!this.schema) {
      this.schema = {};
	}
    if (this.schema && this.schema.constructor === Object) {
		this._schema = _.assign({}, this.schema);
    } else {
		this._schema = this.schema;
    }
    if (!_.isEmpty(this._schema)) {
      this.buttons = this._schema.buttons;
      this._setComponents();
      this._createGroup();
      this._applyConditions();
    }
  }

  protected _beforeNgOnDestroy() { }

  protected _afterNgOnDestroy() { }

  protected _beforeNgOnChanges() { }

  protected _afterNgOnChanges() { }

  ngOnChanges() {
    this._beforeNgOnChanges();
	this._init();
	this._addDisplayProps();
    this._afterNgOnChanges();
  }

  protected _setComponents() {
    const schema = this._schema;
    if (schema) {
      if (schema.constructor === Array) {
        this.components = schema;
      } else if (schema.constructor === Object) {
        if (schema.components) {
          this.components = schema.components;
        } else {
          this.components = [schema];
        }
      }
    }
    schema.components = this.components;
    this._schema = schema;
  }

  ngOnDestroy() {
    this._beforeNgOnDestroy();
    if (
      this._$simpleDisableConditionChange &&
      this._$simpleDisableConditionChange.unsubscribe
    ) {
      this._$simpleDisableConditionChange.unsubscribe();
    }
    if (
      this._$simpleHideConditonChange &&
      this._$simpleHideConditonChange.unsubscribe
    ) {
      this._$simpleHideConditonChange.unsubscribe();
    }
    if (this._$groupValueChange.length !== 0) {
      this._$groupValueChange.forEach(observable => {
        if (observable.unsubscribe) {
          observable.unsubscribe();
        }
      });
    }
    this._afterNgOnDestroy();
  }

  protected _detectGroupValueChange(
    conditionFnction: Function,
    condition?: any,
    index?: any
  ) {
    this._$groupValueChange.push(
      this.group.valueChanges.subscribe(
        conditionFnction.bind(this, condition, index)
      )
    );
  }

  protected _beforeNgAfterViewInit() { }

  protected _afterNgAfterViewInit() { }

  ngAfterViewInit() {
	this._beforeNgAfterViewInit();
	setTimeout(() => {//Used this in very extreme case
		this._addDisplayProps();
	}, 5000);
    this._afterNgAfterViewInit();
  }

  protected _addDisplayProps() {
	let formCode = this.code;
	if ( !formCode ) {
		formCode = '';
	}
    let container = document.querySelector(`#${formCode}_FORM_HELP`);
    if (container) {
      container.innerHTML = this.help;
    }
    if (this.disabled) {
      this.disable();
	}
	if ( this.hidden ) {
		this.hide();
	}
  }

  protected _createGroup() {
    this.group = this._utility.createFormGroup(
      this._fb,
      this.schemaControls
    );
    if (this.group && this.buttons) {
      this.group = this._utility.createFormGroup(
        this._fb,
        this.buttons,
        this.group
      );
    }
  }

  protected _applyConditions() {
    if (this.hideCondition) {
      this._applyConditionalHide();
    }

    if (this.disableCondition) {
      this._applyConditionalDisable();
    }
  }

  protected _applyConditionalHide() {
    this._applyCondition(this.hideCondition, "hide");
  }

  protected _applyConditionalDisable() {
    this._applyCondition(this.disableCondition, "disable");
  }

  protected _applyCondition(actionCondition, action) {
    let conditionObj = actionCondition.condition;
    let i = 0;
    for (const conditionType in conditionObj) {
      const condition = conditionObj[conditionType];
      const conditionHandlerName = `_${conditionType}ConditionHandler`;
      if (
        this[conditionHandlerName] &&
        typeof this[conditionHandlerName] == "function"
      ) {
        if (!this[`_${action}ConditionFlags`][i] === undefined) {
          !this[`_${action}ConditionFlags`].push(false);
        }
        this[`_${action}ConditionFlags`][i] = false;
        this[conditionHandlerName](condition, action, i);
        i++;
      }
    }
  }

  protected _simpleConditionHandler(condition: any, action, flagIndex) {
    let resFlag = false;
    const self = this;
    let handler = data => {
      (<any>window).leftValue = data;
      (<any>window).rightValue = condition["value"];
      (<any>window).operator = condition["operator"];
      (<any>window).result = false;
      const evalStr = `window.result = window.leftValue ${
        (<any>window).operator
        } window.rightValue `;
      eval(evalStr);
      resFlag = (<any>window).result;
      this[`_${action}ConditionFlags`][flagIndex] = resFlag;
      if (action == "disable") {
        this._disableForm(resFlag && this.disableCondition.flag);
      } else if (action == "hide") {
        this._hideForm(resFlag && this.hideCondition.flag);
      }
      return resFlag;
    };
    if (action === "hide") {
      this._$simpleHideConditonChange = this.group
        .get(condition.when)
        .valueChanges.subscribe(data => {
          this[`_${action}ConditionFlags`][flagIndex] = handler.call(
            self,
            data
          );
        });
    } else if (action === "disable") {
      this._$simpleDisableConditionChange = this.group
        .get(condition.when)
        .valueChanges.subscribe(data => {
          this[`_${action}ConditionFlags`][flagIndex] = handler.call(
            self,
            data
          );
        });
    }
  }

  protected _conditionHandler(conditionObj) {
    const appliedCondition = conditionObj.condition;
    const type = conditionObj.type;
    function handleCondition(cond, conditionType) {
      if (conditionType === "function") {
        const fn = new Function("controls", "form", "field", cond);
        const resFlag = fn(this.group.controls, this.group, this);
        return resFlag;
      } else if (conditionType === "jsonLogic") {
        const resFlag = jsonLogic.apply(cond, this.group.controls);
        return resFlag;
      }
    }
    let show = true;

    if (
      appliedCondition.constructor === Array ||
      appliedCondition.constructor === Object
    ) {
      for (let i in appliedCondition) {
        show = handleCondition.call(this, appliedCondition[i], type);
        if (!show) {
          break;
        }
      }
    } else {
      show = handleCondition.call(this, appliedCondition, type);
    }
    return show;
  }

  protected _hideConditionHandler(conditionObj, flagIndex) {
    const flag = this._conditionHandler(conditionObj);
    this._hideConditionFlags[flagIndex] = flag;
    this._hideForm(flag && this.hideCondition.flag);
  }

  protected _disableConditionHandler(conditionObj, flagIndex) {
    const flag = this._conditionHandler(conditionObj);
    this._hideConditionFlags[flagIndex] = flag;
    this._disableForm(flag && this.disableCondition.flag);
  }

  protected _advancedConditionHandler(
    condition: string,
    action: string,
    flagIndex
  ) {
    const conditionObj = {
      condition,
      type: "function"
    };
    const handlerFn = `_${action}ConditionHandler`;
    if (this[handlerFn]) {
      this._detectGroupValueChange(
        this[handlerFn],
        conditionObj,
        flagIndex
      );
    } else {
      console.log(
        `Advanced conditional handler ${handlerFn} does not exist.`
      );
    }
  }

  protected _jsonConditionHandler(
    condition: object,
    action: string,
    flagIndex
  ) {
    const conditionObj = {
      condition,
      type: "jsonLogic"
    };
    const handlerFn = `_${action}ConditionHandler`;
    if (this[handlerFn]) {
      this._detectGroupValueChange(
        this[handlerFn],
        conditionObj,
        flagIndex
      );
    } else {
      console.log(
        `Advanced conditional handler ${handlerFn} does not exist.`
      );
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  getDependentData(flexilabel, value) {
    let data: any = this._dependent.dependentData(flexilabel, value);
    data.forEach(field => {
      if (field.fieldType == "SEL" || field.fieldType == "MSL") {
        this.setFieldOptions(field.flexiLabel, field.data);
      } else {
        this.setValue(field.flexiLabel, field.data);
      }
    });
  }

  setFieldOptions(flexiLabel: string, options: any) {
    const control = this.getControl(flexiLabel);
    if (control) {
      const fldCompObj = this.componentInstances[flexiLabel];
      fldCompObj.lov = options;
    }
  }

  setDisabled(flexiLabel: string, disable?: boolean) {
    if (this.getControl(flexiLabel)) {
      const method = disable ? "disable" : "enable";
      this.getControl(flexiLabel)[method]();
      return;
    }
  }

  protected _disableForm(flag?: boolean) {
    if (flag) {
      this.disable();
    } else {
      this.show();
    }
  }

  disable() {
    this.group.disable({ emitEvent: false });
  }

  enable() {
    this.group.enable({ emitEvent: false });
  }

  hide() {
    this._renderer.addClass(this._eleRef.nativeElement, "hidden");
  }

  show() {
    this._renderer.removeClass(this._eleRef.nativeElement, "hidden");
  }

  protected _hideForm(flag?: boolean) {
    if (flag) {
      this.hideForm();
    } else {
      this.showForm();
    }
  }

  hideForm() {
    if (this.formInstance) {
      this.formInstance.hide();
    }
  }

  showForm() {
    if (this.formInstance) {
      this.formInstance.show();
    }
  }

  hideField(flexilabel) {
    if (this.getControl(flexilabel)) {
      this.getFieldInstance(flexilabel).hide();
    }
  }

  showField(flexilabel) {
    if (this.getControl(flexilabel)) {
      this.getFieldInstance(flexilabel).show();
    }
  }

  setValue(flexiLabel: string, value: any) {
    let control: AbstractControl = this.getControl(flexiLabel);
    if (control) {
      control.setValue(value, { emitEvent: true, onlySelf: true });
    } else {
      console.log(
        `Can not set value of undefined control ${flexiLabel}.`
      );
    }
  }

  getFieldInstance(flexilabel) {
    return this.componentInstances[flexilabel];
  }

  setDefaultValue() {
    this.components.forEach(componentConfig => {
      const flexiLabel: string = componentConfig.flexiLabel;
      const value: any = componentConfig.defaultValue;
      if (value) {
        this.setValue(flexiLabel, value);
      }
    });
  }

  getValue(flexiLabel: string) {
    let field: AbstractControl = this.getControl(flexiLabel);
    if (field) {
      return field.value;
    } else {
      console.log(
        `Can not get value of undefined control ${flexiLabel}.`
      );
    }
    return;
  }

  get disabled() {
    return this._schema.disabled;
  }

  set disabled(disabled) {
    this._schema.disabled = disabled;
  }

  get buttons() {
    return this._buttons;
  }

  set buttons(button) {
    this._buttons = button;
  }

  get controls() {
    return this.group.controls;
  }

  get code() {
	  if ( this._schema.code ) {
		  return this._schema.code;
	  }
    return 'FORMXXXXXXX';
  }

  get label() {
    return this._schema.formLabel;
  }

  get hidden() {
    return this._schema.hidden;
  }

  get help() {
    return this._schema.help;
  }

  set hideCondition(hideCondition) {
    this._schema.hideCondition = hideCondition;
  }

  get hideCondition() {
    return this._schema.hideCondition;
  }

  get disableCondition() {
    return this._schema.disableCondition;
  }

  set disableCondition(dConditioin) {
    this._schema.disableCondition = dConditioin;
  }

  getControl(fldFlexiLabel) {
    return this.controls[fldFlexiLabel];
  }

  get schemaControls() {
    return this.components;
  }
  get changes() {
    return this.group.valueChanges;
  }
  get valid() {
    return this.group.valid;
  }
  get value() {
    return this.group.value;
  }
}
