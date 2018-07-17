import { OnInit, Input, AfterViewInit } from '@angular/core';
import { FeFormSchemaService } from '@L1Main/services/formSchema.service';


export class DefaultFormComponent implements OnInit, AfterViewInit {
    @Input() resource: any;

    protected _schema: any;
    protected _code: String = 'DEFAULTFORM';
    protected _hideLabel: boolean;
    private __instance: any;
    protected _components: any;

    public formComponent;

    constructor(protected formSchemaService: FeFormSchemaService) { }

    ngOnInit() {
        this.init();
    }

    ngAfterViewInit() {
        console.log('this.code', this.code);
        console.log('this.instance.code',this.instance.code)
    }

    public init() {
        const formSchema = this.formSchemaService.getFormSchema(this.code);
        this.schema = formSchema;
        this._hideLabel = this.schema.hideLabel;
    }

    submit(value: { [name: string]: any }) {
        console.log(value);
    }

    get schema() {
        return this._schema;
    }

    set schema( schema ) {
        this._schema = schema;
    }

    get instance() {
        return this.__instance;
    }

    set instance( instance ) {
        this.__instance = instance;
    }

    get labelHidden() {
        return this._hideLabel;
    }

    get code() {
        return this._code;
    }

    set code( code ) {
        this._code = code ;
    }

    get components() {
        return this._components;
    }

    set components( components ) {
        this._components = components;
    }
    
}
