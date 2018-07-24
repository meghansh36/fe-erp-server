import { OnInit, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormSchemaService } from '@L3Main/services/formSchema.service';
import { DependentService } from '@L3Process/system/modules/formGenerator/services/dependent.service';
import * as _ from 'lodash';


export class FeDefaultFormComponent implements OnInit, AfterViewInit {
    @Input() resource?: any;

    protected _originalSchema: any;
    protected _schema: any;
    protected _code: string = 'DEFAULTFORM';
    protected _hideLabel: boolean;
    protected _instance: any;
    protected _components: any;

    public formComponent;

    protected _dummyField;
    protected _dummyObject;

    constructor(public formSchemaService: FormSchemaService, public dependent: DependentService, protected _elemRef: ElementRef, protected _renderer: Renderer2) { }

    protected _beforeNgOnInit() {

    }

    protected _afterNgOnInit() {

    }

    public hide() {
        console.log("hide called");
        if (this._renderer) {
            console.log("hide now");
            this._renderer.addClass(this._elemRef.nativeElement, 'hidden');
        }
    }

    public show() {
        if (this._renderer) {
            this._renderer.removeClass(this._elemRef.nativeElement, 'hidden');
        }
    }

    disable() {
        this.formComponent.disable();
    }

    enable() {
        this.formComponent.enable();
    }

    ngOnInit() {
        this._beforeNgOnInit();
        this.resource.formInstance = this;
        this.init();
        this._afterNgOnInit();
    }

    protected _beforeNgAfterViewInit() {

    }

    protected _afterNgAfterViewInit() {

    }

    ngAfterViewInit() {
        this._beforeNgAfterViewInit();
        if (this.hidden) {
            this.hide();
        }
        this._afterNgAfterViewInit();
    }

    public init() {
        console.log("this.code", this.code);

        //const formSchema = this.formSchemaService.getFormSchema(this.code);
        //this._originalSchema = formSchema;
        this.schema = _.assign({}, this._originalSchema);
        this._hideLabel = this.schema.hideLabel;
        this._dummyObject = {
            name: 'Harish'
        };
        this._dummyField = [
            {
                "type": "TXT",
                "label": "User Name",
                "hideLabel": false,
                "labelPosition": "top",
                "marginTop": "",
                description: `We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else.`,
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
                appliedValidations: ['required'],
                "flexiLabel": "username1",
                "prefix": "@",
                "suffix": "",
                "validations": "",
                "customFuncValidation": "",
                "jsonLogicVal": "",
                "formClassValidation": "",
                "events": "",
                "showCondition": "",
                "disableCondition": "",
                "active": true,
                "required": true,
                "labelWidth": "",
                "labelMargin": "",
                "width": "50%",
                "mask": [],
                "icon": "",
                "key": "_xhawl6mlx",
                "order": 0,
                "parent": "root_drop",
                "componentName": "TextComponent"
            }/* ,
            {
                "type": "DAT",
                "label": "Date",
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
                appliedValidations: [],
                "flexiLabel": "dob1",
                "prefix": "",
                "suffix": "$",
                description: `We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else.`,
                "validations": "",
                minimumDate: '01-Jul-2010',
                maximumDate: '01-Jul-2011',
                "customFuncValidation": "",
                "jsonLogicVal": "",
                "formClassValidation": "",
                "events": "",
                "showCondition": "",
                "disableCondition": "",
                "active": true,
                "required": true,
                "labelWidth": "",
                "labelMargin": "",
                "width": "50%",
                "mask": [],
                "description": "",
                "icon": "",
                "key": "_xhawl6mlx",
                "order": 0,
                "parent": "root_drop",
                "componentName": "TextComponent"
            } */
        ];
        console.log("this.dummyField", this.dummyField);
    }


    submit(value: { [name: string]: any }) {
        console.log("form is submitted", value);
    }

    get schema() {
        return this._schema;
    }

    set schema(schema) {
        this._schema = schema;
    }

    get instance() {
        return this._instance;
    }

    set instance(instance) {
        this._instance = instance;
    }

    get labelHidden() {
        return this._hideLabel;
    }

    get code() {
        return this._code;
    }

    set code(code) {
        this._code = code;
    }

    get components() {
        return this._components;
    }

    set components(components) {
        this._components = components;
    }

    get hidden() {
        return this._schema.hidden;
    }

    set hidden(hidden) {
        this._schema.hidden = hidden;
    }

    get originalSchema() {
        return this._originalSchema;
    }

    set originalSchema(originalSchema) {
        this._originalSchema = originalSchema;
    }

    get dummyField() {
        return this._dummyField;
    }

    get dummyObject() {
        return this._dummyObject;
    }

}
