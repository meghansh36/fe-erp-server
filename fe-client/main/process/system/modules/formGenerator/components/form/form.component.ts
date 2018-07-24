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
  protected _$groupValueChange: any[];
  protected _$simpleShowConditionChange: any;
  protected _$simpleDisableConditionChange: any;
  protected _schema: any;
  protected _buttons: any;

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

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    if (this.schema && this.schema.constructor === Object) {
      this._schema = _.assign({}, this.schema);
    } else {
      this._schema = this.schema;
    }
    this.buttons = this._schema.buttons;
    this._setComponents();
    this._createGroup();
    this._applyConditions();
    this._afterNgOnInit();
  }

  protected _beforeNgOnDestroy() {}

  protected _afterNgOnDestroy() {}

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
    this._$simpleConditionChange.unsubscribe();
    this._$groupValueChange.forEach(observable => {
      observable.unsubscribe();
    });
    this._$simpleDisableConditionChange.unsubscribe();
    this._$simpleShowConditionChange.unsubscribe();
    this._afterNgOnDestroy();
  }

  protected _detectGroupValueChange(
    conditionFnction: Function,
    condition?: any
  ) {
    this._$groupValueChange.push(
      this.group.valueChanges.subscribe(conditionFnction.bind(this, condition))
    );
  }

  protected _simpleEnableHandler(condition: { [key: string]: any }) {
    this._$simpleConditionChange = this.group.controls[
      condition.when
    ].valueChanges.subscribe(data => {
      if (data == condition.eq) {
        this.group.disable({ emitEvent: false });
      }
    });
  }

  protected _advancedEnableHandler(condition: string) {
    const theInstructions = new Function("controls", condition);
    function handler() {
      const show = theInstructions(this.controls);
      if (show == true) {
        this.group.disable({ emitEvent: false });
      }
    }
    this._detectGroupValueChange(handler);
  }

  protected _jsonEnableHandler(condition: object) {
    function handler() {
      if (jsonLogic.apply(condition["condition"], this.group.controls)) {
        this.group.disable({ emitEvent: false });
      }
    }
    this._detectGroupValueChange(handler);
  }

  protected _beforeNgOnChanges() {}

  protected _afterNgOnChanges() {}

  ngOnChanges() {
    this._beforeNgOnChanges();
    if (this.group) {
      const controls = Object.keys(this.controls);
      const configControls = this.schemaControls.map(item => item.flexiLabel);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.group.removeControl(control));

      configControls
        .filter(control => !controls.includes(control))
        .forEach(flexiLabel => {
          const config = this.components.find(
            control => control.flexiLabel === flexiLabel
          );
          this.group.addControl(
            flexiLabel,
            this._utility.createControl(this._fb, config)
          );
        });
    }
    this._afterNgOnChanges();
  }

  protected _beforeNgAfterViewInit() {}

  protected _afterNgAfterViewInit() {}

  ngAfterViewInit() {
    this._beforeNgAfterViewInit();
    this.setDefaultValue();
    const container = document.querySelector(`#${this.code}_HELP_CONTAINER`);
    if (container) {
      container.innerHTML = this.help;
    }

    if (this.disabled) {
      this.disable();
    }

    this._afterNgAfterViewInit();
  }

  protected _createGroup() {
    this.group = this._utility.createFormGroup(this._fb, this.schemaControls);
  }

  protected _applyConditions() {
    if (this.showCondition) {
      this._applyConditionalShowHide();
    }

    if (this.disableCondition) {
      this._applyConditionalDisable();
    }
  }

  protected _applyConditionalShowHide() {
    this._applyCondition(this.showCondition, "show");
  }

  protected _applyConditionalDisable() {
    this._applyCondition(this.disableCondition, "disable");
  }

  protected _applyCondition(conditionObj, action) {
    for (const conditionType in conditionObj) {
      const condition = conditionObj[conditionType];
      const conditionHandlerName = `_${conditionType}ConditionHandler`;
      if (
        this[conditionHandlerName] &&
        typeof this[conditionHandlerName] == "function"
      ) {
        this[conditionHandlerName](condition, action);
      } else {
        console.log(
          `Given condition handler is not a function for field ${this.code}`
        );
      }
    }
  }

  protected _simpleConditionHandler(condition: any, action) {
    let resFlag = true;
    const self = this;
    function handler(data) {
      (<any>window).leftValue = data;
      (<any>window).rightValue = condition["value"];
      (<any>window).operator = condition["operator"];
      (<any>window).result = false;
      const evalStr = `window.result = window.leftValue ${
        (<any>window).operator
      } window.rightValue `;
      eval(evalStr);
      resFlag = (<any>window).result;
      if (action === "show" && resFlag) {
        if (!condition[action]) {
          self.hideForm.call(self);
        } else {
          self.showForm.call(self);
        }
      } else if (action === "disable" && resFlag) {
        if (condition[action]) {
          self.disable.call(self);
        } else {
          self.enable.call(self);
        }
      }
    }
    if (action === "show") {
      this._$simpleShowConditionChange = this.group
        .get(condition.when)
        .valueChanges.subscribe(data => {
          handler(data);
        });
    } else if (action === "disable") {
      this._$simpleDisableConditionChange = this.group
        .get(condition.when)
        .valueChanges.subscribe(data => {
          handler(data);
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

  protected _showConditionHandler(conditionObj) {
    if (!this._conditionHandler(conditionObj)) {
      this.hideForm();
    }
  }

  protected _disableConditionHandler(conditionObj) {
    const disabled = this._conditionHandler(conditionObj);
    if (disabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  protected _advancedConditionHandler(condition: string, action: string) {
    const conditionObj = {
      condition,
      type: "function"
    };
    const handlerFn = `_${action}ConditionHandler`;
    if (this[handlerFn]) {
      this._detectGroupValueChange(this[handlerFn], conditionObj);
    } else {
      console.log(`Advanced conditional handler ${handlerFn} does not exist.`);
    }
  }

  protected _jsonConditionHandler(condition: object, action: string) {
    const conditionObj = {
      condition,
      type: "jsonLogic"
    };
    const handlerFn = `_${action}ConditionHandler`;
    if (this[handlerFn]) {
      this._detectGroupValueChange(this[handlerFn], conditionObj);
    } else {
      console.log(`Advanced conditional handler ${handlerFn} does not exist.`);
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
      console.log(`Can not set value of undefined control ${flexiLabel}.`);
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
      console.log(`Can not get value of undefined control ${flexiLabel}.`);
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
    return this._schema.code || "feFormCode";
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

  set showCondition(showCondition) {
    this._schema.showCondition = showCondition;
  }

  get showCondition() {
    return this._schema.showCondition;
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
