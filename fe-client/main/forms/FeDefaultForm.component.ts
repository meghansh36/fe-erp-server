import { OnInit, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormSchemaService } from '@L3Main/services/formSchema.service';
import { DependentService } from '@L3Modules/system/controllers/formGenerator/services/dependent.service';
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
        this.schema = _.assign({}, this._originalSchema);
        this._hideLabel = this.schema.hideLabel;
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

}
