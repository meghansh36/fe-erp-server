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
	ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { DependentService } from "@L3Process/system/modules/formGenerator/services/dependent.service";
import { FieldConfig } from "@L1Process/system/modules/formGenerator/models/field-config.interface";
import * as jsonLogic from "json-logic-js";
import { UtilityService } from "@L3Process/system/services/utility.service";
import { DefaultsService } from "@L3Process/system/services/defaults.service";
import * as _ from "lodash";
import { DefaultsService } from "../../../../../../../legislations/fe/clients/fe/main/process/system/services/defaults.service";

/**
 * Creates a from using the given JSON Schema
 *
 * @export
 * @class FeFormComponent
 * @implements {OnChanges}
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
@Component({
	exportAs: "feForm",
	selector: "feForm",
	styleUrls: ["form.component.css"],
	templateUrl: "form.component.html"
})
export class FeFormComponent
	implements OnChanges, OnInit, AfterViewInit, OnDestroy {
	/**
	 * JSON Schema of a form definition. | Array of fields definition | An object of a single field,  passed from the callee (Parent form).
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	@Input() schema: any;

	/**
	 * Instance of Main form (Parent form) in which this form component is created.
	 * @property
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	@Input() formInstance?: any;

	/**
	 * Custom event used to send data to the parent form whenever form is submitted.
	 * @property
	 * @type {EventEmitter<any>}
	 * @memberof FeFormComponent
	 */
	@Output() submit: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * Angular form Form Group of the current form .
	 * @property
	 * @type {FormGroup}
	 * @memberof FeFormComponent
	 */
	public group: FormGroup;

	/**
	 * Current class instance used in template to give input to feFied directive.
	 * @property
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	public instance: any;

	/**
	 * JSON Object of the fields components which are created using the form schema. An object is stored on as ['flexiLabel']: FieldComponent instance.
	 * @property
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	public componentInstances: any = {};

	/**
	 * JSON Definition array of the fields.
	 * @property
	 * @type {FieldConfig[]}
	 * @memberof FeFormComponent
	 */
	public components: FieldConfig[] = [];

	/**
	 * Used to store the subscription of the group value change.
	 * @property
	 * @protected
	 * @type {any[]}
	 * @memberof FeFormComponent
	 */
	protected _$groupValueChange: any[] = [];

	/**
	 * Used to store the value change subscription of the field on basis of which simple condition is defined for hiding the form.
	 * @property
	 * @protected
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	protected _$simpleHideConditonChange: any;

	/**
	 * Used to store the value change subscription of the field on basis of which simple condition is defined for disabling the form.
	 * @property
	 * @protected
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	protected _$simpleDisableConditionChange: any;

	/**
	 * JSON Definition of the form which is used to keep copy of the original schema passed to this form.
	 * @property
	 * @protected
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	protected _schema: any;

	/**
	 *Array or single JSON Object of  which are to be generated out of the form.
	 * @property
	 * @protected
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	protected _buttons: any;

	/**
	 * Contains fields default values and lovs.
	 *
	 * @protected
	 * @type {*}
	 * @memberof FeFormComponent
	 */
	protected _formData: any;

	/**
	 *Creates an instance of FeFormComponent.
	 * @param {FormBuilder} _fb
	 * @param {DependentService} _dependent
	 * @param {Renderer2} _renderer
	 * @param {ElementRef} _eleRef
	 * @param {UtilityService} _utility
	 * @memberof FeFormComponent
	 */
	constructor(
		protected _fb: FormBuilder,
		protected _dependent: DependentService,
		protected _renderer: Renderer2,
		protected _eleRef: ElementRef,
		protected _utility: UtilityService,
		protected _defualts: DefaultsService
	) {
		this.initialize();
	}

	/**
	 * Called from contructor to initialize props before ngOnInit.
	 * @method
	 * @memberof FeFormComponent
	 */
	public initialize() {
		this.instance = this;
		this.componentInstances = [];
		const html = `<div [attr.id]="code+'_CONTAINER'" class="form-container">
		<div class="card ">
		  <div class="card-header" *ngIf="label">
			<div class="form-label-container" >
			  <h5 class="card-title">{{label}}</h5>
			</div>
			<small class="text-muted" [attr.id]="code+'_FORM_HELP'">
			</small>

		  </div>
		  <div class="card-body">
			<div class="form-fields-container">
			  <form [attr.id]="code" class="feForm flex-container" [formGroup]="group" (submit)="handleSubmit($event)">
				<ng-container *ngFor="let field of components;" feField [form]="formInstance" [schema]="schema" [config]="field" [group]="group"
				  [formComponent]="instance">
				</ng-container>

			  </form>
			</div>
		  </div>
		  <div class="card-footer"  >
			<div class="form-buttons-container  flex-container"  *ngIf="buttons">
			  <ng-container *ngFor="let btn of buttons;" feField [form]="formInstance" [schema]="schema" [config]="btn" [group]="group"
				  [formComponent]="instance">
				</ng-container>
			  </div>
		  </div>
		</div>
	  </div>
	  `;
	  console.log("Form container html", html);
		this._renderer.appendChild( this._eleRef.nativeElement, html );
	}

	/**
	 * Callback called just before running ngOnInit hook.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _beforeNgOnInit() {}

	/**
	 * Callback called just after running ngOnInit hook. Can be overridden by the children classes.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _afterNgOnInit() {}

	/**
	 * Lifecycle hook called just after the constructor whenever an instance is created.
	 * @method ngOnInit
	 * @memberof FeFormComponent
	 */
	ngOnInit() {
		/** Call the callback before calling the _init to perform initialization in children classes. */
		this._beforeNgOnInit();
		/** _init method is called to initialize the properties. */
		this._init();
		/** Call the callback after calling the _init to perform initialization in children classes. */
		this._afterNgOnInit();
	}

	/**
	 * _init called from ngOnInit hook to initialize the properties. This method is called after calling _beforeNgOnInit and before _afterNgOnInit.
	 * @method _init
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _init() {
		/** Create the form group. */
		this.group = this._fb.group({});

		if (!this.schema) {
			this.schema = {};
		}
		/** If schema is an object then make the copy. */
		if (this.schema && this.schema.constructor === Object) {
			this._schema = _.assign({}, this.schema);
		} else {
			this._schema = this.schema;
		}
		if (!_.isEmpty(this._schema)) {
			/** Initialize buttons. */
			this.buttons = this._schema.buttons;
			/** Initialize components property. */
			this._setComponents();
			/** Create Reactive Form Group  */
			this._createGroup();
			/** Apply conditions which are given to hide or disable the form. */
			this._applyConditions();
		}
	}

	/**
	 * Callback called from ngOnDestroy hook, before destroying the instance of the component.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _beforeNgOnDestroy() {}

	/**
	 * Callback called from ngOnDestroy, after destroying the instance of the component.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _afterNgOnDestroy() {}

	/**
	 * Called whenever a component instance is destroyed.
	 * @method
	 * @memberof FeFormComponent
	 */
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

	/**
	 * Callback called from ngOnChanges, before executing the code of the hook
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _beforeNgOnChanges() {}

	/**
	 * Callback called from ngOnChanges, after executing the code of the hook
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _afterNgOnChanges() {}

	/**
	 * Angular hook called whenever any input value is changed.
	 * @method
	 * @memberof FeFormComponent
	 */
	ngOnChanges() {
		/** Call the callback */
		this._beforeNgOnChanges();
		/** Re-initialize every time whenever there is a change in inputs. */
		this._init();
		/** Apply display related properties (hide, disable ....) . */
		this._addDisplayProps();
		this._afterNgOnChanges();
	}

	/**
	 * Called from ngAfterViewInit hook, before executing hook code.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _beforeNgAfterViewInit() {}

	/**
	 * Called from ngAfterViewInit hook, after executing hook code.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _afterNgAfterViewInit() {}

	/**
	 * Angular hook called after intializing the view.
	 * @method
	 * @memberof FeFormComponent
	 */
	ngAfterViewInit() {
		this._beforeNgAfterViewInit();
		setTimeout(() => {
			//Used this in very extreme case
			this._addDisplayProps();
		}, 5000);
		this._getValues();
		this._afterNgAfterViewInit();
	}

	/**
	 * Sets the components array from 'components' property of json schema.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _setComponents() {
		const schema = this._schema;
		if (schema) {
			/** If schema is an array (It means fields definition array is passed as schema.)  */
			if (schema.constructor === Array) {
				this.components = schema;
			} else if (schema.constructor === Object) { /** If schema is an object (It means schema is form json def or a single field def.) */
				/** In case a form JSON definition is passed and that json has a key comoponents. */
				if (schema.components) {
					this.components = schema.components;
				} else {
					/** If Single field json definition is passed then make it an array. */
					this.components = [schema];
				}
			}
		}
		schema.components = this.components;
		this._schema = schema;
	}

	/**
	 * Used to subscribe the value changes of the Form Group.
	 * @method
	 * @protected
	 * @param {Function} conditionFnction
	 * @param {*} [condition]
	 * @param {*} [index]
	 * @memberof FeFormComponent
	 */
	protected _detectGroupValueChange(
		conditionFnction: Function,
		condition?: any,
		index?: any
	) {
		/** Subscribe and push the subscription to the subscription array so that it can be unsubscribed. */
		this._$groupValueChange.push(
			this.group.valueChanges.subscribe(
				conditionFnction.bind(this, condition, index)
			)
		);
	}

	/**
	 * Applies form label properties such as hidden, disable and help.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _addDisplayProps() {
		let formCode = this.code;
		if (!formCode) {
			formCode = "";
		}
		/** Set th form help. */
		let container = document.querySelector(`#${formCode}_FORM_HELP`);
		if (container) {
			container.innerHTML = this.help;
		}
		if (this.disabled) {
			this.disable();
		}
		if (this.hidden) {
			this.hide();
		}
	}

	/**
	 * Creates a Reactive Form Group.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _createGroup() {
		/** Create the form group. */
		this.group = this._utility.createFormGroup(
			this._fb,
			this.schemaControls
		);
		/** If buttons are defined then add the buttons controls in form group. */
		if (this.group && this.buttons) {
			this.group = this._utility.createFormGroup(
				this._fb,
				this.buttons,
				this.group
			);
		}
	}

	/**
	 * Applies hide or disable conditions if provided.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _applyConditions() {
		/** If hide condition is defined in then apply. */
		if (this.hideCondition) {
			this._applyConditionalHide();
		}

		/** If disable condition is defined then apply. */
		if (this.disableCondition) {
			this._applyConditionalDisable();
		}
	}

	/**
	 * Applies the 'hide' condition.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _applyConditionalHide() {
		this._applyCondition(this.hideCondition, "hide");
	}

	/**
	 *Applies the disable conditionn.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _applyConditionalDisable() {
		this._applyCondition(this.disableCondition, "disable");
	}

	/**
	 * Called from _applyConditionalHide and _applyConditionalDisable to apply the condition.
	 * @method
	 * @protected
	 * @param {*} actionCondition
	 * @param {*} action
	 * @memberof FeFormComponent
	 */
	protected _applyCondition(actionCondition: any, action: string) {
		const conditionObj = actionCondition.condition;
		let i = 0;
		/** conditionObj contains three types of conditions 'simple', 'advanced' and 'json' */
		for (const conditionType in conditionObj) {
			const condition = conditionObj[conditionType];
			const conditionHandlerName = `_${conditionType}ConditionHandler`;/** Create the handler name from condition type dynamically. */
			if (
				this[conditionHandlerName] &&
				typeof this[conditionHandlerName] == "function"
			) {/** Condition */
				this[conditionHandlerName](condition, action, i);
				i++;
			} else {
				console.log( `Unsupprted condition type ${conditionType}. Supported condition types are 'simple', 'advanced' or 'json'` );
			}
		}
	}

	/**
	 * Used to apply 'simple' type condition. Called from _applyCondition.
	 * @method
	 * @protected
	 * @param {*} condition
	 * @param {*} action
	 * @param {*} flagIndex
	 * @memberof FeFormComponent
	 */
	protected _simpleConditionHandler(condition: any, action, flagIndex) {
		let resFlag = false;
		const self = this;
		/** private function called on group value change. Applies the simple condition. */
		let handler = data => {
			/** Add values in the window to eval. */
			(<any>window).leftValue = data;
			(<any>window).rightValue = condition["value"];
			(<any>window).operator = condition["operator"];
			(<any>window).result = false;
			const evalStr = `window.result = window.leftValue ${
				(<any>window).operator
			} window.rightValue `;
			eval(evalStr);
			/** Get the result. */
			resFlag = (<any>window).result;
			/** Take the action. */
			if (action == "disable") {
				this._disableForm(resFlag && this.disableCondition.flag);
			} else if (action == "hide") {
				this._hideForm(resFlag && this.hideCondition.flag);
			}
		};
		if (action === "hide") {
			this._$simpleHideConditonChange = this.group
				.get(condition.when)
				.valueChanges.subscribe(data => {
					handler.call(
						self,
						data
					);
				});
		} else if (action === "disable") {
			this._$simpleDisableConditionChange = this.group
				.get(condition.when)
				.valueChanges.subscribe(data => {
					handler.call(
						self,
						data
					);
				});
		}
	}

	/**
	 * Common handler for 'json' and 'function' or 'advanced' type conditions.
	 * @method
	 * @protected
	 * @param {*} conditionObj
	 * @returns
	 * @memberof FeFormComponent
	 */
	protected _conditionHandler(conditionObj) {
		const appliedCondition = conditionObj.condition;
		const type = conditionObj.type;
		function handleCondition(cond, conditionType) {
			if (conditionType === "function") {/** If condition type is 'function' then execute the function after creating the function. */
				const fn = new Function("controls", "form", "field", cond);
				const resFlag = fn(this.group.controls, this.group, this);
				return resFlag;
			} else if (conditionType === "jsonLogic") { /** if condition type if 'json' then apply the json logic */
				const resFlag = jsonLogic.apply(cond, this.group.controls);
				return resFlag;
			}
		}
		let flag = true;
		if (
			appliedCondition.constructor === Array ||
			appliedCondition.constructor === Object
		) { /** Handle multiple conditions (array or object) */
			for (let i in appliedCondition) {
				flag = handleCondition.call(this, appliedCondition[i], type);
				if (!flag) {
					break;
				}
			}
		} else { /** Handle single condition. */
			flag = handleCondition.call(this, appliedCondition, type);
		}
		return flag;
	}

	/**
	 * Applies 'hide' Condition, called from _advancedConditionHandler or _jsonConditionHandler.
	 * @method
	 * @protected
	 * @param {*} conditionObj
	 * @param {*} flagIndex
	 * @memberof FeFormComponent
	 */
	protected _hideConditionHandler(conditionObj, flagIndex) {
		const flag = this._conditionHandler(conditionObj);
		this._hideForm(flag && this.hideCondition.flag);
	}

	/**
	 *  Applies 'disable' Condition called from _advancedConditionHandler or _jsonConditionHandler.
	 *
	 * @protected
	 * @param {*} conditionObj
	 * @param {*} flagIndex
	 * @memberof FeFormComponent
	 */
	protected _disableConditionHandler(conditionObj, flagIndex) {
		const flag = this._conditionHandler(conditionObj);
		this._disableForm(flag && this.disableCondition.flag);
	}

	/**
	 *
	 *
	 * @protected
	 * @param {string} condition
	 * @param {string} action
	 * @param {*} flagIndex
	 * @memberof FeFormComponent
	 */
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

	/**
	 * json Condition Handler called from _advancedConditionHandler or _jsonConditionHandler.
	 *
	 * @protected
	 * @param {object} condition
	 * @param {string} action
	 * @param {*} flagIndex
	 * @memberof FeFormComponent
	 */
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
			/** Apply the group value change */
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

	/**
	 * Called when form is submitted.
	 *
	 * @param {Event} event
	 * @memberof FeFormComponent
	 */
	handleSubmit(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		/** Send data to parent form. */
		this.submit.emit(this.value);
	}

	/**
	 * Called whenver a parent field's value is changed.
	 * @method
	 * @param {*} flexilabel
	 * @param {*} value
	 * @memberof FeFormComponent
	 */
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

	/**
	 *
	 *
	 * @param {string} flexiLabel
	 * @param {*} options
	 * @memberof FeFormComponent
	 */
	setFieldOptions(flexiLabel: string, options: any) {
		const control = this.getControl(flexiLabel);
		if (control) {
			const fldCompObj = this.componentInstances[flexiLabel];
			fldCompObj.lov = options;
		}
	}

	/**
	 * Called to fetch the fields lovs and default values from the server.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _getValues() {
		/** Make an http request to fetch the default values and lovs and set in this.formData and then call this._setVaues*/
		this.formData = {};
		for( let flexiLabel in this.componentInstances ) {
			var instance = this.componentInstances[flexiLabel];
			let lovs = [];
			let defaultValues = [];
			if ( _.includes( this._defualts.LIST_TYPE_FIELDS_ARR, instance.type ) ) {
				for ( let i = 120; i<125; i++ ) {
					lovs.push({
						code: i,
						meaning: `Option ${i}`
					});
				}
				defaultValues = '123';
			}
			this.formData[ flexiLabel ]	= {
				l: lovs,
				d: defaultValues
			};
		}
		this._setValues();
	}

	/**
	 * Called to set lovs and default values after fetching theme from server.
	 * @method
	 * @protected
	 * @memberof FeFormComponent
	 */
	protected _setValues() {
		for( let flexiLabel in this.formData ) {//Contains { [flexiLabel]:{d: 'defaultValue', l: 'lov'} }
			const fieldData = this.formData.flexiLabel;
			const fieldInstance = this.getFieldInstance( flexiLabel );
			if ( fieldInstance ) {
				if ( fieldData.l && _.includes( this._defaults.LIST_TYPE_FIELDS_ARR, fieldInstance.type) ) { //l = lov
					let lov = [ ...fieldData.l ];
					if ( _.includes( this._defaults.LIST_TYPE_FIELDS_ARR, 'SEL' ) ) {
						lov = [ ...this._defualts.DROPDOWN_DEFAULT_OPTION, lov ];
					}
					this.setFieldOptions( flexiLabel, lov );
				}
				if( fieldData.d) {
					this.setValue( flexiLabel, fieldData.d );
				}
			}
		}
	}

	/**
	 *
	 *
	 * @param {string} flexiLabel
	 * @param {boolean} [disable]
	 * @returns
	 * @memberof FeFormComponent
	 */
	setDisabled(flexiLabel: string, disable?: boolean) {
		if (this.getControl(flexiLabel)) {
			const method = disable ? "disable" : "enable";
			this.getControl(flexiLabel)[method]();
			return;
		}
	}

	/**
	 *
	 *
	 * @protected
	 * @param {boolean} [flag]
	 * @memberof FeFormComponent
	 */
	protected _disableForm(flag?: boolean) {
		if (flag) {
			this.disable();
		} else {
			this.show();
		}
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	disable() {
		this.group.disable({ emitEvent: false });
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	enable() {
		this.group.enable({ emitEvent: false });
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	hide() {
		this._renderer.addClass(this._eleRef.nativeElement, "hidden");
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	show() {
		this._renderer.removeClass(this._eleRef.nativeElement, "hidden");
	}

	/**
	 *
	 *
	 * @protected
	 * @param {boolean} [flag]
	 * @memberof FeFormComponent
	 */
	protected _hideForm(flag?: boolean) {
		if (flag) {
			this.hideForm();
		} else {
			this.showForm();
		}
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	hideForm() {
		if (this.formInstance) {
			this.formInstance.hide();
		}
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	showForm() {
		if (this.formInstance) {
			this.formInstance.show();
		}
	}

	/**
	 *
	 *
	 * @param {*} flexilabel
	 * @memberof FeFormComponent
	 */
	hideField(flexilabel) {
		if (this.getControl(flexilabel)) {
			this.getFieldInstance(flexilabel).hide();
		}
	}

	/**
	 *
	 *
	 * @param {*} flexilabel
	 * @memberof FeFormComponent
	 */
	showField(flexilabel) {
		if (this.getControl(flexilabel)) {
			this.getFieldInstance(flexilabel).show();
		}
	}

	/**
	 * Set value of a control.
	 * @method
	 * @param {string} flexiLabel
	 * @param {*} value
	 * @memberof FeFormComponent
	 */
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

	/**
	 *
	 *
	 * @param {*} flexilabel
	 * @returns
	 * @memberof FeFormComponent
	 */
	getFieldInstance(flexilabel) {
		return this.componentInstances[flexilabel];
	}


	/**
	 *
	 *
	 * @param {string} flexiLabel
	 * @returns
	 * @memberof FeFormComponent
	 */
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

	/**
	 *
	 *
	 * @param {*} fldFlexiLabel
	 * @returns
	 * @memberof FeFormComponent
	 */
	getControl(fldFlexiLabel) {
		return this.controls[fldFlexiLabel];
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	get disabled() {
		return this._schema.disabled;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	set disabled(disabled) {
		this._schema.disabled = disabled;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	get buttons() {
		return this._buttons;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	set buttons(button) {
		this._buttons = button;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get controls() {
		return this.group.controls;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get code() {
		if (this._schema.code) {
			return this._schema.code;
		}
		return "FORMXXXXXXX";
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get label() {
		return this._schema.formLabel;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get hidden() {
		return this._schema.hidden;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get help() {
		return this._schema.help;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	set hideCondition(hideCondition) {
		this._schema.hideCondition = hideCondition;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	get hideCondition() {
		return this._schema.hideCondition;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	get disableCondition() {
		return this._schema.disableCondition;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	set disableCondition(dConditioin) {
		this._schema.disableCondition = dConditioin;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get schemaControls() {
		return this.components;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get changes() {
		return this.group.valueChanges;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get valid() {
		return this.group.valid;
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof FeFormComponent
	 */
	get value() {
		return this.group.value;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	set formData(formData) {
		this._formData = formData;
	}

	/**
	 *
	 *
	 * @memberof FeFormComponent
	 */
	get formData() {
		return this._formData;
	}
}
