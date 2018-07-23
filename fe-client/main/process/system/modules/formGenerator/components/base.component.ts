import { OnInit, Injectable, Renderer2, ElementRef, OnDestroy, AfterViewInit, SimpleChange } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ValidatorsService } from '@L3Process/system/modules/formGenerator/services/validators.service';
import { UtilityService } from '@L3Process/system/services/utility.service';
import { Field } from '@L1Process/system/modules/formGenerator/models/field.interface';
import { FieldConfig } from '@L1Process/system/modules/formGenerator/models/field-config.interface';
import * as jsonLogic from 'json-logic-js';
import { DefaultsService } from '@L3Process/system/services/Defaults.service';


@Injectable()
export class FeBaseComponent implements Field, OnInit, OnDestroy, AfterViewInit {

    public config: FieldConfig;
    public group?: FormGroup;
    public form?: any;
    public formComponent?: any;

    public conditionClass: string;
    public error: string;
    public validators = [];
    public name: string;
    public errors = [];
    public style: any;
    public defaultClasses: any;

    protected _$statusChange: any;
    protected _$valueChange: any;
    protected _$simpleShowConditionChange: any;
    protected _$simpleDisableConditionChange: any;
    protected _$groupValueChange: any[];

    //Copy config in its prop
    protected _config: FieldConfig;



    constructor(protected _elemRef: ElementRef, protected _validator: ValidatorsService, protected _render: Renderer2, protected _utility: UtilityService, protected _defaults: DefaultsService) {
        this._utility.renderer = this._render;
    }

    protected _beforeNgOnInit() {

    }

    protected _afterNgOnInit() {

    }

    ngOnInit(): void {
        this._beforeNgOnInit();
        this._init();
        this._afterNgOnInit();
    }

    _init() {
        this._config = _.assign({}, this.config);
        this._applyValidations();
        this._initFieldStyle();
        this._applyObservers();
    }

    protected _beforeNgAfterViewInit() {

    }

    ngAfterViewInit() {
        this._beforeNgAfterViewInit();
        this._bindEvents();
        this._utility.addDisplayProps(this);
        if (this.hidden) {
            this.hide();
        }
        this._afterNgAfterViewInit();
    }

    protected _afterNgAfterViewInit() {

    }

    protected _beforeNgOnDestroy() {

    }

    protected _afterNgOnDestroy() {

    }

    ngOnDestroy() {
        this._beforeNgOnDestroy();
        this._$statusChange.unsubscribe();
        this._$valueChange.unsubscribe();
        this._$simpleDisableConditionChange.unsubscribe();
        this._$simpleShowConditionChange.unsubscribe();
        this._$groupValueChange.forEach(observable => {
            observable.unsubscribe();
        });
        this._afterNgOnDestroy();
    }

    protected _bindEvents() {
        try {
            const eventsObjArr: object = this.events;
            if (eventsObjArr) {
                const field = this.fieldRef;
                for (let eventName in eventsObjArr) {
                    this._render.listen(field, eventName, this._utility.fieldEventHandler.bind(this._utility, eventName, eventsObjArr[eventName], this));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    protected _applyObservers(): void {
        this._$statusChange = this.control.statusChanges.subscribe(this._onStatusChange.bind(this));
        if (this.isParent) {
            this._$valueChange = this.control.valueChanges.subscribe(this._onValueChange.bind(this));
        }
        if (this.showCondition) {
            this._applyConditionalShowHide();
        }
        if (this.disableCondition) {
            this._applyConditionalDisable();
        }
    }

    protected _applyConditionalShowHide() {
        console.log("Going to apply _applyConditionalShowHide");
        this._applyCondition(this.showCondition, 'show');
    }

    protected _applyConditionalDisable() {
        console.log("Going to apply _applyConditionalDisable");
        this._applyCondition(this.disableCondition, 'disable');
    }

    protected _applyCondition(conditionObj, action) {

        for (const conditionType in conditionObj) {
            const condition = conditionObj[conditionType];
            console.log();
            const conditionHandlerName = `_${conditionType}ConditionHandler`;
            console.log("conditionHandlerName", conditionHandlerName);
            if (this[conditionHandlerName] && typeof this[conditionHandlerName] == 'function') {
                console.log("Calling condition handler");
                this[conditionHandlerName](condition, action);
            }
            else {
                console.log(`Given condition handler is not a function for field ${this.flexiLabel}`);
            }
        }
    }

    protected _detectGroupValueChange(conditionFnction: Function, condition?: any) {
        this._$groupValueChange.push(this.group.valueChanges.subscribe(conditionFnction.bind(this, condition)));
    }

    protected _simpleConditionHandler(condition: any, action) {
        let resFlag = true;
        const self = this;
        function handler(data) {
            console.log("Simple condition handler", data);
            (<any>window).leftValue = data;
            (<any>window).rightValue = condition['value'];
            (<any>window).operator = condition['operator'];
            (<any>window).result = false;
            const evalStr = `window.result = window.leftValue ${(<any>window).operator} window.rightValue `;
            console.log("evalStr", evalStr);
            eval(evalStr);
            resFlag = (<any>window).result;
            console.log('resFlag', resFlag, "action", action);
            //if ( resFlag ) {
            if (action === 'show') {
                self._hideFieldComponent.call(self, resFlag && !condition[action]);
            } else if (action === 'disable' && resFlag) {
                if ( condition[action]) {
                    self.disable.call(self);
                } else {
                    self.enable.call(self);
                }
            }
            //}
        }
        if (action === 'show') {
            this._$simpleShowConditionChange = this.group.get(condition.when).valueChanges.subscribe((data) => {
                handler(data);
            })
        } else if (action === 'disable') {
            this._$simpleDisableConditionChange = this.group.get(condition.when).valueChanges.subscribe(data => {
                handler(data);
            });
        }
    }

    protected _conditionHandler(conditionObj) {
        const appliedCondition = conditionObj.condition;
        const type = conditionObj.type;
        console.log("_conditionHandler appliedCondition", appliedCondition, "appliedCondition.constructor === Array", appliedCondition.constructor, Array, appliedCondition.constructor === Array);
        function handleCondition(cond, conditionType) {
            console.log("handleCondition condition", cond, " conditionType", conditionType);
            if (conditionType === 'function') {
                const fn = new Function('controls', 'form', 'field', cond);
                const resFlag = fn(this.group.controls, this.form, this);
                console.log("fn resFlag", resFlag);
                return resFlag;
            } else if (conditionType === 'jsonLogic') {
                const resFlag = jsonLogic.apply(cond, this.group.controls);
                console.log("jsonLogin resFlag", resFlag);
                return resFlag;
            }
        }
        let show = true;

        if (appliedCondition.constructor === Array || appliedCondition.constructor === Object) {
            console.log("Going to iterate appliedCondition");
            for (let i in appliedCondition) {
                show = handleCondition.call(this, appliedCondition[i], type);
                if (!show) {
                    break;
                }
            }
        } else {
            console.log("Single applied condition");
            show = handleCondition.call(this, appliedCondition, type);
        }
        return show;
    }

    protected _showConditionHandler(conditionObj) {
        console.log("showConditionHandler  conditionObj", conditionObj);
        this._hideFieldComponent(!this._conditionHandler(conditionObj));
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
            type: 'function'
        }
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
            type: 'jsonLogic'
        }
        const handlerFn = `_${action}ConditionHandler`;
        if (this[handlerFn]) {
            this._detectGroupValueChange(this[handlerFn], conditionObj);
        } else {
            console.log(`Advanced conditional handler ${handlerFn} does not exist.`);
        }
    }

    disable() {
        this.disabled = true;
        this.control.disable({
            onlySelf: true
        });
    }

    enable() {
        this.disabled = false;
        this.control.enable({
            onlySelf: true
        });
    }

    hide() {
        this._render.addClass(this._elemRef.nativeElement, 'hidden');
    }

    show() {
        this._render.removeClass(this._elemRef.nativeElement, 'hidden');
    }

    protected _hideFieldComponent(hidden) {
        console.log("called _hideFieldComponent hidden", hidden);
        if (hidden === true) {
            this.hide();
        } else {
            this.show();
        }
    }


    protected _onValueChange(value: SimpleChange) {
        if (value) {
            this.formComponent.getDependentData(this.flexiLabel, value);
        }
        return;
    }

    protected _onStatusChange(status: string): void {
        if (status == 'INVALID') {
            this.addCssClass('fieldClasses', 'is-invalid');
            this.addCssClass('labelClasses', 'text-danger');
            this.removeCssClass('labelClasses', 'valid-field-label');
        } else if (status == 'VALID') {
            this.removeCssClass('fieldClasses', 'is-invalid');
            this.removeCssClass('labelClasses', 'text-danger');
            this.addCssClass('labelClasses', 'valid-field-label');
        }
    }

    removeCssClass(targetKey: string, classStr: string): boolean {
        if (!this.defaultClasses[targetKey]) {
            return false;
        }
        this.defaultClasses[targetKey][classStr] = false;
        return true;
    }

    addCssClass(targetKey: string, classStr: string): boolean {
        if (!this.defaultClasses[targetKey]) {
            return false;
        }
        if (this.hasCssClass(targetKey, classStr)) {
            return true;
        }
        this.defaultClasses[targetKey][classStr] = true;
        return true;
    }

    toggleCssClass(targetKey: string, classStr: string): boolean {
        if (this.hasCssClass(targetKey, classStr)) {
            return this.removeCssClass(targetKey, classStr);
        } else {
            return this.addCssClass(targetKey, classStr);
        }
    }

    hasCssClass(targetKey: string, classStr: string): boolean {
        return this.defaultClasses[targetKey] && this.defaultClasses[targetKey][classStr];
    }

    _applyValidations(): void {
        this._addExtraValidations();
        if (this.validations) {
            this._applyNgValidators();
        }
        if (this.customFuncValidation) {
            this._applyFnValidations();
        }

        if (this.formClassValidation) {
            this._applyFormClassValidation();
        }

        if (this.jsonLogicVal) {
            this._applyJsonValidations();
        }
        this.control.setValidators(this.validators);
    }

    protected _addNgValidation(validation) {
        if (validation && validation.constructor && validation.constructor === Object) {
            this.validations = _.assign({}, this.validations, validation);
        }
    }

    protected _addExtraValidations() {
        console.log(`Before pushing custom validation for field ${this.label}`, this.validations);
        if (this.minimumValue && this.maximumValue) {
            this._addNgValidation(this._validator.getCustomValidation('range', { min: this.minimumValue, max: this.maximumValue }));

        } else if (this.minimumValue) {
            this._addNgValidation(this._validator.getCustomValidation('min', this.minimumValue));
        } else if (this.maximumValue) {
            this._addNgValidation(this._validator.getCustomValidation('max', this.maximumValue));
        }
        console.log("this.appliedValidations", this.appliedValidations)
        if (this.appliedValidations && this.appliedValidations.constructor == Array && this.appliedValidations) {
            console.log(1);
            this.appliedValidations.forEach(validationName => {
                console.log(`Goint to add ${validationName} validation.`);
                if (validationName == 'required') {
                    this.required = true;
                }
                this._addNgValidation(this._validator.getCustomValidation.call(this._validator, validationName, true));

            });
        }
    }

    protected _applyNgValidators(): void {
        console.log(this.flexiLabel);

        console.log("this.validations", this.validations);
        this.validators = this.validators.concat(this._validator.getValidators(this.validations, this.control));
        console.log("this.validators", this.validators);
        this.errors = this._validator.transformToValidErr(this.validations);
        console.log("this.errors", this.errors);
    }

    protected _applyFnValidations(): void {
        try {
            const validations = this.customFuncValidation;
            for (let name in validations) {
                const validation = validations[name];
                const fnStr: string = validation.validatorFn;
                const fn = new Function('control', fnStr);
                const message: string = validation.message;
                if (typeof fn == 'function') {
                    this.validators.push(fn);
                    const errObj = {
                        name,
                        message
                    };
                    this.errors.push(errObj)
                } else {
                    console.log(`Given _validator is not a function for validation ${name} for field ${this.flexiLabel}`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    protected _applyFormClassValidation(): void {
        try {
            if (!this.form) {
                console.log(`Form class instance not found in field for applying form class validations for field ${this.code}`);
                return;
            }
            const validations = this.formClassValidation;
            for (let validationName in validations) {
                const validation = validations[validationName];
                const validatorFunc = validation.validatorFuncName;
                const errorMessage = validation.message;
                if (this.form[validatorFunc] && typeof this.form[validatorFunc] == 'function') {
                    this.control.setAsyncValidators(this.form[validatorFunc].bind(this.form));
                    const errorObj = {
                        name: validationName,
                        message: errorMessage
                    };
                    this.errors.push(errorObj);
                } else {
                    console.log(`Form class _validator function ${validatorFunc} does not exist for ${validationName} custom validation for field ${this.code}.`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    protected _applyJsonValidations() {
        const json = this.jsonLogicVal;
        let fn = function (control: AbstractControl): { [key: string]: boolean } | null { if (jsonLogic.apply(json['json'], control) != true) { return { 'json': true }; } return null; }
        this.validators.push(fn);
        const errorObj = {
            name: 'json',
            message: json['message']
        };
        this.errors.push(errorObj);
    }

    protected _initFieldStyle() {
        this.defaultClasses = this._utility.getFieldClasses(this);
        this.style = this._utility.getFieldStyles(this);
    }

    protected _beforeSetDefaultClasses(classes) {
        return classes;
    }


    protected _beforeSetDefaultStyle(styleObj) {
        return styleObj;
    }

    hasNgValidation(validationName: string) {
        return (this.validations && this.validations[validationName] && this.validations[validationName].value);
    }

    hasCustomValidation(validationName: string) {
        return (this.formClassValidation && this.formClassValidation[validationName]);
    }

    hasFormClassValidation(validationName: string) {
        return (this.formClassValidation && this.formClassValidation[validationName]);
    }

    hasValidation(validationName: string) {
        return (this.hasNgValidation(validationName) || this.hasCustomValidation(validationName) || this.hasFormClassValidation(validationName));
    }

    get isValid() {
        return this.control.valid;
    }

    get isInvalid() {
        return this.control.invalid;
    }

    get hasError() {
        return this.isInvalid && (this.dirty || this.touched);
    }

    get dirty() {
        return this.control.dirty;
    }

    get touched() {
        return this.control.touched;
    }
    get control(): AbstractControl {
        return this.group.controls[this.flexiLabel];
    }

    get fieldId() {
        return this.id;
    }

    get fieldRef() {
        return document.querySelector(`#${this.fieldId}`);
    }

    get hasTextLenghtLimit() {
        return (this.hasValidation('maxLength') || this.hasValidation('minLength'));
    }


    get resource() {
        return this.form.resource;
    }

    set value(value: any) {
        this.control.setValue(value);
    }

    get value() {
        return this.control.value;
    }

    get disabled() {
        return this._config.disabled;
    }

    get label() {
        return this._config.label;
    }

    get id() {
        return this._config.id;
    }

    get hideLabel() {
        return this._config.hideLabel;
    }

    get prefix() {
        return this._config.prefix;
    }

    get suffix() {
        return this._config.suffix;
    }

    get customCssClass() {
        return this._config.customCssClass;
    }

    get description() {
        return this._config.description;
    }

    get code() {
        return this._config.code;
    }

    get flexiLabel() {
        return this._config.flexiLabel;
    }

    get lov() {
        return this._config.lov;
    }

    get isParent() {
        return this._config.isParent;
    }

    get placeholder() {
        return this._config.placeholder;
    }

    get type() {
        return this._config.type;
    }

    get validation() {
        return this._config.validation;
    }

    get formClassValidation() {
        return this._config.formClassValidation;
    }

    get jsonLogicVal() {
        return this._config.jsonLogicVal;
    }

    get validations() {
        return this._config.validations;
    }

    get mask() {
        return this._config.mask;
    }

    get labelPosition() {
        return this._config.labelPosition;
    }

    get labelWidth() {
        return this._config.labelWidth;
    }

    get hidden() {
        return this._config.hidden;
    }

    get labelMargin() {
        return this._config.labelMargin;
    }

    get tabIndex() {
        return this._config.tabIndex;
    }

    get marginTop() {
        return this._config.marginTop;
    }

    get marginRight() {
        return this._config.marginRight;
    }

    get marginBottom() {
        return this._config.marginBottom;
    }

    get marginLeft() {
        return this._config.marginLeft;
    }

    get width() {
        return this._config.width;
    }

    get events() {
        return this._config.events;
    }

    get showCondition() {
        return this._config.showCondition;
    }

    get defaultValue() {
        return this._config.defaultValue;
    }

    get components() {
        return this._config.components;
    }



    set disabled(disabled) {
        this._config.disabled = disabled;
    }

    set label(label) {
        this._config.label = label;
    }

    set id(id) {
        this._config.id = id;
    }

    set hideLabel(hideLabel) {
        this._config.hideLabel = hideLabel;
    }

    set prefix(prefix) {
        this._config.prefix = prefix;
    }

    set suffix(suffix) {
        this._config.suffix = suffix;
    }

    set customCssClass(customCssClass) {
        this._config.customCssClass = customCssClass;
    }

    set description(description) {
        this._config.description = description;
    }

    set code(code) {
        this._config.code = code;
    }

    set flexiLabel(flexiLabel) {
        this._config.flexiLabel = flexiLabel;
    }

    set lov(lov) {
        this._config.lov = lov;
    }

    set isParent(isParent) {
        this._config.isParent = isParent;
    }

    set placeholder(placeholder) {
        this._config.placeholder = placeholder;
    }

    set type(type) {
        this._config.type = type;
    }

    set validation(validation) {
        this._config.validation = validation;
    }

    set formClassValidation(formClassValidation) {
        this._config.formClassValidation = formClassValidation;
    }

    set jsonLogicVal(jsonLogicVal) {
        this._config.jsonLogicVal = jsonLogicVal;
    }

    set validations(validations) {
        this._config.validations = validations;
    }

    set mask(mask) {
        this._config.mask = mask;
    }

    set labelPosition(labelPosition) {
        this._config.labelPosition = labelPosition;
    }

    set labelWidth(labelWidth) {
        this._config.labelWidth = labelWidth;
    }

    set hidden(hidden) {
        this._config.hidden = hidden;
    }

    set labelMargin(labelMargin) {
        this._config.labelMargin = labelMargin;
    }

    set tabIndex(tabIndex) {
        this._config.tabIndex = tabIndex;
    }

    set marginTop(marginTop) {
        this._config.marginTop = marginTop;
    }

    set marginRight(marginRight) {
        this._config.marginRight = marginRight;
    }

    set marginBottom(marginBottom) {
        this._config.marginBottom = marginBottom;
    }

    set marginLeft(marginLeft) {
        this._config.marginLeft = marginLeft;
    }

    set width(width) {
        this._config.width = width;
    }

    set events(events) {
        this._config.events = events;
    }

    set showCondition(showCondition) {
        this._config.showCondition = showCondition;
    }

    set defaultValue(defaultValue) {
        this._config.defaultValue = defaultValue;
    }

    set components(components) {
        this._config.components = components;
    }

    get ckeditor() {
        return this._config.ckeditor;
    }

    set ckeditor(ckeditor) {
        this._config.ckeditor = ckeditor;
    }

    get tooltip() {
        return this._config.tooltip;
    }

    set tooltip(tooltip) {
        this._config.tooltip = tooltip;
    }

    set minimumValue(minimumValue) {
        this._config.minimumValue = minimumValue;
    }

    get minimumValue() {
        return this._config.minimumValue;
    }

    get maximumValue() {
        return this._config.maximumValue;
    }

    set maximumValue(maximumValue) {
        this._config.maximumValue = maximumValue;
    }

    get disableCondition() {
        return this._config.disableCondition;
    }

    set disableCondition(dConditioin) {
        this._config.disableCondition = dConditioin;
    }

    get required() {
        return this.hasValidation('required');
    }

    set required(required) {
        this._config.required = required;
    }

    get appliedValidations() {
        return this._config.appliedValidations;
    }

    set appliedValidations(appliedValidations) {
        this._config.appliedValidations = appliedValidations;
    }

    get inputPropsArray() {
        return this._config.inputPropsArray;
    }

    set inputPropsArray(inputPropsArray) {
        this._config.inputPropsArray = inputPropsArray;
    }

    get customFuncValidation() {
        return this._config.customFuncValidation;
    }

    set customFuncValidation(customFuncValidation) {
        this._config.inputPropsArray = customFuncValidation;
    }

    get spellcheck() {
        return this._config.spellcheck;
    }
    set spellcheck(spellcheck) {
        this._config.spellcheck = spellcheck;
    }

}