import { OnInit, Injectable, Renderer2, ElementRef, OnDestroy, AfterViewInit, SimpleChange } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { FeValidatorsService } from '@L1Process/system/modules/formGenerator/services/validators.service';
import { Field } from '@L1Process/system/modules/formGenerator/models/field.interface';
import { FieldConfig } from '@L1Process/system/modules/formGenerator/models/field-config.interface';
import * as jsonLogic from 'json-logic-js';


@Injectable()
export class FeBaseComponent implements Field, OnInit, OnDestroy, AfterViewInit {

    public config: FieldConfig;
    public group: FormGroup;
    public form: any;
    public formComponent: any;

    public conditionClass: string;
    public error: string;
    public validators = [];
    public name: string;
    public errors = [];
    public style: any;
    public defaultClasses: any;
    public defaultFieldWidth: any;

    public $statusChange: any;
    public $valueChange: any;
    public $simpleConditionChange: any;
    public $groupValueChange: any;

    // Config properties which are the properties of this class

    protected _disabled: any;
    protected _label: any;
    protected _id: any;
    protected _hideLabel: any;
    protected _prefix: any;
    protected _suffix: any;
    protected _customCssClass: any;
    protected _description: any;
    protected _code: any;
    protected _flexiLabel: any;
    protected _options: any;
    protected _isParent: any;
    protected _placeholder: any;
    protected _type: any;
    protected _validation: any;
    protected _customValidations: any;
    protected _jsonValidations: any;
    protected _validations: any;
    protected _formClassValidations: any;
    protected _mask: any;
    protected _labelPosition: any;
    protected _labelWidth: any;
    protected _hidden: any;
    protected _labelMargin: any;
    protected _tabIndex: any;
    protected _marginTop: any;
    protected _marginRight: any;
    protected _marginBottom: any;
    protected _marginLeft: any;
    protected _width: any;
    protected _events: any;
    protected _condition: any;
    protected _defaultValue: any;
    protected _components: any;
    protected _theme: any;
    protected _size: any;
    protected _leftIcon: any;
    protected _rightIcon: any;
    protected _ckeditor: any;
    protected _tooltip: any;
    protected _show: any;

    //Copy config in its prop
    protected _config: FieldConfig;



    constructor(public elemRef: ElementRef, public validator: FeValidatorsService, public render: Renderer2) {
        this.defaultFieldWidth = '50%';
    }

    ngOnInit(): void {
        this.init();
    }

    init() {
        this._config = _.assign({}, this.config);
        this.applyDefaultValidations();
        this.initFieldStyle();
        this.applyObservers();
    }

    ngAfterViewInit() {
        this.bindEvents();
        this.addDisplayProps();
    }


    ngOnDestroy() {
        this.$statusChange.unsubscribe();
        this.$valueChange.unsubscribe();
        this.$simpleConditionChange.unsubscribe();
        this.$groupValueChange.unsubscribe();
    }

    addDisplayProps() {
        if ( this.type == 'HID' ) {
            this.render.addClass( this.elemRef.nativeElement, 'hidden' );
        }
        this.render.addClass( this.elemRef.nativeElement, 'fe-field-component' );
    }


    static evalFnArgs(argsStr) {
        try {
            const evaluatedArgsArr = [];
            argsStr = argsStr.trim().split(',');
            argsStr.forEach((value) => {
                value = value.trim();
                const evalStr = eval(value);
                evaluatedArgsArr.push(evalStr);
            });
            return evaluatedArgsArr;
        } catch (error) {
            console.log(error);
        }
    }

    fieldEventHandler(eventName, handlerData, event) {
        try {
            let handlerOwnerType = handlerData.handlerOwner;
            const handlerFnName = handlerData.handlerName;
            const args = handlerData.args;
            let ownerObject: any = {};
            if (!handlerOwnerType) {
                handlerOwnerType = 'form';
            }
            ownerObject = this[handlerOwnerType]; //this.resource or this.form
            if (!ownerObject) {
                console.log(`Event handler function owner ${handlerOwnerType} object does not exist in current field component object. So can not call bound function.`);
                return;
            }
            if (!ownerObject) {
                console.log(`Event handler type ${handlerOwnerType} does not exist in field component class for event ${eventName} for ${this.flexiLabel}`);
                return;
            }
            if (ownerObject[handlerFnName] && typeof ownerObject[handlerFnName] == 'function') {
                const argsArr = FeBaseComponent.evalFnArgs(args);
                argsArr.push(this);
                argsArr.push(event);
                ownerObject[handlerFnName].apply(ownerObject, argsArr)
            } else {
                console.log(`Event handler ${handlerFnName} does not exist in ${handlerOwnerType} class for event ${eventName} for ${this.flexiLabel}`);
            }

        } catch (error) {
            console.log(error);
        }
    }


    bindEvents() {
        try {
            const eventsObjArr: object = this.events;
            if (eventsObjArr) {
                const field = this.fieldRef;
                for (let eventName in eventsObjArr) {
                    this.render.listen(field, eventName, this.fieldEventHandler.bind(this, eventName, eventsObjArr[eventName]));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    applyObservers(): void {
        this.$statusChange = this.control.statusChanges.subscribe(this.onStatusChange.bind(this));
        if (this.isParent) {
            this.$valueChange = this.control.valueChanges.subscribe(this.onValueChange.bind(this));
        }
        if (this.condition) {
            this.render.addClass(this.elemRef.nativeElement, 'hidden');
            const type = this.condition['type'];
            const conditionHandlerName = `${type}ConditionHandler`;
            if (this[conditionHandlerName] && typeof this[conditionHandlerName] == 'function') {
                this[conditionHandlerName](this.condition[type]);
            }
            else {
                console.log(`Given condition handler is not a function for field ${this.flexiLabel}`);
            }
        }
    }

    detectGroupValueChange(conditionFnction: Function) {
        this.$groupValueChange = this.group.valueChanges.subscribe(conditionFnction.bind(this));
    }

    simpleConditionHandler(condition: { [key: string]: any }) {
        if (condition.show == true) {
            this.render.addClass(this.elemRef.nativeElement, 'hidden');
            this.$simpleConditionChange = this.group.get(condition.when).valueChanges.subscribe((data) => {
                data == condition.eq ? this.render.removeClass(this.elemRef.nativeElement, 'hidden') : this.render.addClass(this.elemRef.nativeElement, 'hidden');
            })
        }
        else {
            this.render.removeClass(this.elemRef.nativeElement, 'hidden');
            this.$simpleConditionChange = this.group.get(condition.when).valueChanges.subscribe((data) => {
                data == condition.eq ? this.render.addClass(this.elemRef.nativeElement, 'hidden') : this.render.removeClass(this.elemRef.nativeElement, 'hidden');
            })
        }
    }

    advancedConditionHandler(condition: string) {
        const theInstructions = new Function('controls', 'formObject', 'fieldObject', condition);
        function handler() {
            const show = theInstructions(this.group.controls, this.form, this);
            if (show == true) {
                this.render.removeClass(this.elemRef.nativeElement, 'hidden');
            }
            else {
                this.render.addClass(this.elemRef.nativeElement, 'hidden');
            }
        }
        this.detectGroupValueChange(handler);
    }

    jsonConditionHandler(condition: object) {
        function handler() {
            if (jsonLogic.apply(condition['condition'], this.group.controls)) {
                this.render.removeClass(this.elemRef.nativeElement, 'hidden');
            }
            else {
                this.render.addClass(this.elemRef.nativeElement, 'hidden');
            }
        }
        this.detectGroupValueChange(handler);
    }


    onValueChange(value: SimpleChange) {
        if (value) {
            this.formComponent.getDependentData(this.flexiLabel, value);
        }
        return;
    }

    onStatusChange(status: string): void {
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

    applyDefaultValidations(): void {
        if (this.validations) {
            this.applyNgValidators();
        }
        if (this.customValidations) {
            this.applyCustomValidations();
        }

        if (this.formClassValidations) {
            this.applyFormClassValidations();
        }

        if (this.jsonValidations) {
            this.applyJsonValidations();
        }
        this.control.setValidators(this.validators);
    }

    applyNgValidators(): void {
        this.validators = this.validators.concat(this.validator.getValidators(this.validations));
        this.errors = this.validator.transformToValidErr(this.validations);
    }

    applyCustomValidations(): void {
        try {
            const validations = this.customValidations;
            for (let name in validations) {
                const validation = validations[name];
                const fn: any = validation.validatorFn;
                const message: string = validation.message;
                if (typeof fn == 'function') {
                    this.validators.push(fn);
                    const errObj = {
                        name,
                        message
                    };
                    this.errors.push(errObj)
                } else {
                    console.log(`Given validator is not a function for validation ${name} for field ${this.flexiLabel}`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    applyFormClassValidations(): void {
        try {
            if (!this.form) {
                console.log(`Form class instance not found in field for applying form class validations for field ${this.code}`);
                return;
            }
            const validations = this.formClassValidations;
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
                    console.log(`Form class validator function ${validatorFunc} does not exist for ${validationName} custom validation for field ${this.code}.`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    applyJsonValidations() {
        const json = this.jsonValidations;
        let fn = function (control: AbstractControl): { [key: string]: boolean } | null { if (jsonLogic.apply(json['json'], control) != true) { return { 'json': true }; } return null; }
        this.validators.push(fn);
        const errorObj = {
            name: 'json',
            message: json['message']
        };
        this.errors.push(errorObj);
    }

    initFieldStyle() {
        this.defaultClasses = this.getFieldClasses();
        this.style = this.getFieldStyles();
    }

    getFieldClasses() {
        const type = this.type;
        let labelPosition = 'top';
        const customCssClass = this.customCssClass || '';

        if (!this.hideLabel && this.labelPosition) {
            labelPosition = this.labelPosition;
        }

        let fieldContainerClasses = {};
        let classesStr = `form-field-container frm-fld-container ${type}-container`;
        if (this.prefix || this.suffix) {
            classesStr += ' input-group';
        }
        fieldContainerClasses = this._makeCssClassesObj(classesStr);

        let fieldMainWrapperClasses = {};
        classesStr = `fe-field ${type}-container form-group ${labelPosition}-labeled-field`;
        if (this.hidden) {
            classesStr += ' hidden';
        }
        fieldMainWrapperClasses = this._makeCssClassesObj(classesStr);

        let fieldLabelContainerClasses = {};
        classesStr = `fe-field-container field-label-container ${type}-label-container`;
        if (this.hideLabel) {
            classesStr += ' hidden';
        }
        if (this.hasTextLenghtLimit) {
            classesStr += ' has-text-limit';
        }
        fieldLabelContainerClasses = this._makeCssClassesObj(classesStr);

        let fieldWrapperClasses = {};
        classesStr = `field-wrapper ${type}-field-wrapper field-label-${labelPosition}`;
        fieldWrapperClasses = this._makeCssClassesObj(classesStr);

        let fieldDescWrapperClasses = {};
        classesStr = `field-desc-container ${type}-desc-cont`;
        fieldDescWrapperClasses = this._makeCssClassesObj(classesStr);

        let fieldDescContainerClasses = {};
        classesStr = `form-text text-muted field-desc ${type}-desc`;
        fieldDescContainerClasses = this._makeCssClassesObj(classesStr);

        let labelClasses = {};
        classesStr = `field-label ${type}-label`;
        if (this.isMandatory) {
            classesStr += ` mandatory-field-label`;
        }
        labelClasses = this._makeCssClassesObj(classesStr);

        let fieldErrorWrapperClasses = {};
        classesStr = `field-error-wrapper ${type}-error-wrapper`;
        fieldErrorWrapperClasses = this._makeCssClassesObj(classesStr);

        let fieldClasses = {};
        classesStr = `form-field ${type}-field ${customCssClass}`;
        if (this.isMandatory) {
            classesStr += ` mandatory-field`;
        }
        fieldClasses = this._makeCssClassesObj(classesStr);

        let nestedFieldContainerClasses = {};
        classesStr = `fe-field-container fe-${type}-wrapper`;
        nestedFieldContainerClasses = this._makeCssClassesObj(classesStr);

        let classes: any = {
            fieldMainWrapperClasses,
            fieldWrapperClasses,
            fieldLabelContainerClasses,
            fieldContainerClasses,
            fieldDescWrapperClasses,
            fieldDescContainerClasses,
            labelClasses,
            fieldErrorWrapperClasses,
            fieldClasses,
            nestedFieldContainerClasses
        };

        classes = this.beforeSetDefaultClasses(classes);
        return classes;
    }

    public beforeSetDefaultClasses(classes) {
        return classes;
    }

    _makeCssClassesObj(cssClassesStr: string): any {
        const cssClassesObj = {};
        const cssClassArr = cssClassesStr.trim().split(' ')
        cssClassArr.forEach((cssClass) => {
            cssClassesObj[cssClass] = true;
        });
        return cssClassesObj;
    }

    getFieldStyles() {
        const fieldLabelContainerStyle: any = {};
        const fieldMainWrapperStyle = {};

        const labelWidth = this.labelWidth;
        const labelMargin = this.labelMargin;

        if (labelWidth) {
            fieldLabelContainerStyle.width = `${labelWidth}px`;
        }

        let fieldWidth = this.defaultFieldWidth;
        if (this.width) {
            fieldWidth = this.width;
        }
        if (fieldWidth) {
            this.render.setStyle(this.elemRef.nativeElement, 'width', fieldWidth);
        }
        if (this.type === 'HID') {
            this.render.addClass(this.elemRef.nativeElement, 'hidden');
        }

        if (labelMargin) {
            const margin: string = `${labelMargin}px`;
            let marginSide: string = 'margin-top';

            switch (this.labelPosition) {
                case 'bottom': {
                    marginSide = 'margin-top';
                    break;
                }
                case 'left': {
                    marginSide = 'margin-right';
                    break;
                }
                case 'right': {
                    marginSide = 'margin-left';
                    break;
                }
                default: {
                    marginSide = 'margin-top';
                    break;
                }
            }
            fieldLabelContainerStyle[marginSide] = margin;
        }

        if ( this.labelWidth ) {
            fieldLabelContainerStyle[ 'width' ] = this.labelWidth;
        }

        if (this.marginLeft) {
            fieldMainWrapperStyle['margin-left'] = this.marginLeft;
        }

        if (this.marginRight) {
            fieldMainWrapperStyle['margin-right'] = this.marginRight;
        }

        if (this.marginTop) {
            fieldMainWrapperStyle['margin-top'] = this.marginTop;
        }

        if (this.marginBottom) {
            fieldMainWrapperStyle['margin-bottom'] = this.marginBottom;
        }

        let inlineStyle = {
            fieldMainWrapperStyle,
            fieldWrapperStyle: {},
            fieldDescWrapperStyle: {},
            fieldDescContainerStyle: {},
            fieldLabelContainerStyle,
            fieldContainerdStyle: {},
            labelStyle: {},
            fieldStyle: {},
            nestedFieldContainerStyle: {}

        };
        inlineStyle = this.beforeSetDefaultStyle(inlineStyle);
        return inlineStyle;
    }

    beforeSetDefaultStyle(styleObj) {
        return styleObj;
    }

    hasNgValidation(validationName: string) {
        return (this.validations && this.validations[validationName] && this.validations[validationName].value);
    }

    hasCustomValidation(validationName: string) {
        return (this.customValidations && this.customValidations[validationName]);
    }

    hasFormClassValidation(validationName: string) {
        return (this.formClassValidations && this.formClassValidations[validationName]);
    }

    hasValidation(validationName: string) {
        return (this.hasNgValidation(validationName) || this.hasCustomValidation(validationName) || this.hasFormClassValidation(validationName));
    }

    get isMandatory(): boolean {
        return (this.validations && this.validations['required'] && this.validations.required.value);
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

    set value(val: any) {
        this.formComponent.setValue(this.flexiLabel, val);
    }

    get value() {
        return this.formComponent.getValue(this.flexiLabel);
    }

    get show() {
        return this._config.show;
    }

    set show(show) {
        this._config.show = show;
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

    get options() {
        return this._config.options;
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

    get customValidations() {
        return this._config.customValidations;
    }

    get jsonValidations() {
        return this._config.jsonValidations;
    }

    get validations() {
        return this._config.validations;
    }

    get formClassValidations() {
        return this._config.formClassValidations;
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

    get condition() {
        return this._config.condition;
    }

    get defaultValue() {
        return this._config.defaultValue;
    }

    get components() {
        return this._config.components;
    }

    get theme() {
        return this._config.theme;
    }

    get size() {
        return this._config.size;
    }

    get leftIcon() {
        return this._config.leftIcon;
    }

    get rightIcon() {
        return this._config.rightIcon;
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

    set options(options) {
        this._config.options = options;
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

    set customValidations(customValidations) {
        this._config.customValidations = customValidations;
    }

    set jsonValidations(jsonValidations) {
        this._config.jsonValidations = jsonValidations;
    }

    set validations(validations) {
        this._config.validations = validations;
    }

    set formClassValidations(formClassValidations) {
        this._config.formClassValidations = formClassValidations;
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

    set condition(condition) {
        this._config.condition = condition;
    }

    set defaultValue(defaultValue) {
        this._config.defaultValue = defaultValue;
    }

    set components(components) {
        this._config.components = components;
    }

    set theme(theme) {
        this._config.theme = theme;
    }

    set size(size) {
        this._config.size = size;
    }

    set leftIcon(leftIcon) {
        this._config.leftIcon = leftIcon;
    }

    set rightIcon(rightIcon) {
        this._config.rightIcon = rightIcon;
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

    get icon() {
        return this._config.icon;
    }

    set icon(icon) {
        this._config.tooltip = icon;
    }

}