/*
 *@Component Desription
 *This is the main component for form builder.
 */

import {
	Component,
	ViewChild,
	ComponentFactoryResolver,
	ViewContainerRef,
	DoCheck,
	Renderer2,
	OnInit,
	AfterViewInit
} from '@angular/core';
import { NgBootstrapService } from '@L3Process/system/services/NgBootstrap.service';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { FieldControlService } from '@L3Process/system/modules/formBuilder/services/fieldControl.service';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
import { DragulaService } from 'ng2-dragula';
import { FormBuilderService } from '@L3Process/system/modules/formBuilder/services/formBuilder.service';
import * as _ from 'lodash';
import { MasterFormComponent } from '@L3Process/system/modules/formBuilder/components/Master/masterForm.component';
import { DefaultsService } from '@L3Process/system/services/defaults.service';
import { ActivatedRoute } from '@angular/router';
import { FormSchemaService } from '@L3Main/services/formSchema.service';

@Component({
	selector: 'form-builder',
	templateUrl: './formBuilder.component.html',
	styleUrls: ['./formBuilder.component.css']
})
export class FeFormBuilderComponent implements DoCheck, OnInit, AfterViewInit {
	@ViewChild('host', { read: ViewContainerRef })
		host: ViewContainerRef; // ng-template reference for the root-drop zone
	@ViewChild('buttonHost', { read: ViewContainerRef })
	buttonHost: ViewContainerRef; // ng-template reference for button dropzone
	@ViewChild('content') content; // ng-template reference for master form modal(field options modal)
	@ViewChild('preview') preview; // ng-template reference for preview window modal
	cond: Boolean = false;
	modalRef: any; // stores the modal reference returned by the modal open function
	previewJSON: any; // stores the final JSON which is used by the formGenerator in preview
	finalJSON; // final JSON created in ngDoCheck
	formJson: any; // JSON used to set form properties
	jsonEditorConfig; // config for json editor in form options modal
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
	protected _renderer: Renderer2,
	protected _defaults: DefaultsService,
	protected _route: ActivatedRoute,
	protected _formSchemaService: FormSchemaService ) {
	this._initialize();
}

/*
*@function Description
*Intializes formJson, set Dragula(drag and drop library) configurations
*subscribes to dragula drop events(fired on when drop is successfully completed) and calls
*_.onComponentDrop function
*/
protected _initialize() {
	this.formJson = this._formJsonService.MasterJSON;
	this._setDragulaOptions();
	this._dragulaService.drop.subscribe(this._onComponentDrop.bind(this));
}
/*
*@function Description
*Sets options for dragula drag and drop. All drop zones have the same bag name as 'bag-one'. This
*enables the components to be dragged from one drop zone to another.
*/
protected _setDragulaOptions() {
	this._dragulaService.setOptions('bag-one', {
		revertOnSpill: true, // item not dropped outside of any drop zone - true
		/*
		*copy: @function Description
		*@Arguments ==> el - the DOM node of the element that was dragged.
		*				source - the DOM node of the source container(form-drag component)
		*
		*used so that the elements from the element List(list of elements that can be dragged)
		*are copied and not removed from the form-drag container.
		*/
		copy: function(el, source) {
			return source.id === 'not_copy'; // form-drag container has the not_copy id
		},
		/*
		*accepts: @function Description
		*@Arguments ==> el - the DOM node of the element that was dragged.
		*				target - the DOM node of the target container. Can be root-drop,
		*						 button-drop or fieldset.
		*				source - the DOM node of the source container(form-drag component)
		*				sibling - the DOM node of the sibling element in target
		*
		*used to ascertain which container can accept which elements. Root container
		*and fieldset accepts all elements, button container only accepts the button elements.
		*/
		accepts: function(el, target, source, sibling) {
			// creates array of classes on the target container
			const targetClassesArr = target.className.trim().split(' ');
			// creates array of classes on the dragged elements
			const fieldClassesArr = el.className.trim().split(' ');
			// if buttons are dropped in button container - true
			if (
				_.includes(targetClassesArr, 'buttonDropZone') &&
				_.includes(fieldClassesArr, 'button-input')
			) {
				return true;
			}
			// accept all fields dropped in fieldset or root container.
			else if (
				_.includes(targetClassesArr, 'FSTdropZone') ||
				_.includes(targetClassesArr, 'customDropZone')
			) {
				return true;
			}
		}
	});
}

/*@function Description
* Arguments ==> value - array of DOM node of elements [bag name, dragged element, target, source, sibling ]
*						passed by dragula
*Called when drop complete event fires.
*/
	protected _onComponentDrop(value) {
		// checks if the source of the element is form-drag component. Means new component is to be created.
		if (value[1].nodeName === 'LI') {
			// gets the component name that is to be rendered from the dragged element.
			const componentName = value[1].attributes.getNamedItem(
				'componentName'
			).nodeValue;
			// calculates the index where the element is to be created
			const index = this.calculateIndex(value);
			// !important. Removes the LI element dropped by the dragula from the DOM.
			// In its place, dynamic components are rendered
			value[1].remove();
			this.dropComplete(
				this._formBuilderService.getComponent(componentName),
				index,
				value
			);
		} 
		// checks if the elements are moved within the drop-zones. No new component is generated.
		// Only the order of the components in JSON is to be updated
		else {
			// calculates new index of the element within its container
			const newIndex = this.calculateIndex(value);
			// updates the parent component of the element if it is moved between different containers
			value[1].parentComponent = value[2].id;
			// updates the order of the components in Master Json
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
		// rebuilds final Json on every change(element dropped or moved)
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
		this._applyDisplayProps();
	}

	update(event) {}

	_init() {
		this.jsonEditorConfig = this._defaults.JSON_EDITOR_CONFIG;
		this._route.params.subscribe(this._handleRouteParams.bind(this));
		this._initFormJsonHelp();
	}

	protected _handleRouteParams(params) {
		if (params.formId !== undefined) {
			this._initFormSchema(Number(params.formId));
		}
	}

	protected _initFormSchema(formId?: any) {
		if (formId) {
			const form = this._formSchemaService
				.getFormSchemaById(formId)
				.subscribe(data => {
					const form = data.body.data;
					if (form) {
						for (var key in form) {
							if (key !== "components" && key !== "buttons") {
								this.formJson[key] = form[key];
							}
						}
						this.populateFormBuilder(form.components);
						setTimeout(() => {
							this.populateFormBuilder(form.buttons);
						}, 1000);
					} else {
						console.log("No schema found");
					}
				});
		}
	}

	protected _applyDisplayProps() {
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

	_initFormJsonHelp() {
		this.formJsonHelp = {
			hide: {
				flag: false,
				condition: {
					simple: {
						when: "field-flexilabel",
						value: "rathor",
						operator: "=="
					},
					advanced: [
						"var show; return show = controls.number.value == 150 ? true : false;",
						"var show1; return show1 = controls.otherControl.value == 150 ? true : false;"
					],
					json: {
						hideCondition: {
							and: [
								{ "===": [{ var: "username.value" }, "apple"] },
								{ "===": [{ var: "number.value" }, 15] }
							]
						},
						condition1: {
							and: [
								{
									"===": [
										{ var: "someControl.value" },
										"someValue"
									]
								},
								{
									"===": [
										{ var: "someOtherControl.value" },
										"value"
									]
								}
							]
						}
					}
				}
			},
			disable: {
				flag: false,
				condition: {
					simple: {
						when: "field-flexilabel",
						value: "rathor",
						operator: "=="
					},
					advanced: [
						"var show; return show = controls.number.value == 150 ? true : false;",
						"var show1; return show1 = controls.otherControl.value == 150 ? true : false;"
					],
					json: {
						hideCondition: {
							and: [
								{ "===": [{ var: "username.value" }, "apple"] },
								{ "===": [{ var: "number.value" }, 15] }
							]
						},
						condition1: {
							and: [
								{
									"===": [
										{ var: "someControl.value" },
										"someValue"
									]
								},
								{
									"===": [
										{ var: "someOtherControl.value" },
										"value"
									]
								}
							]
						}
					}
				}
			}
		};
	}

	calculateIndex(value) {
		const [bag, el, target, source, sibling] = value;
		const children = target.children;

		if (sibling === null) {
			return children.length - 1;
		} else {
			return Array.prototype.indexOf.call(children, sibling) - 1;
		}
	}

	dropComplete(componentObj, index, value) {
		this.createComponentFunc(componentObj, index, value[2], value);
		console.log('drop complete', componentObj, value)
		if ((componentObj.component.name !== 'FieldSetComponent' && value[2].id === 'root_drop') || value[2].id === 'button_drop') {
			this.openModal();
		}
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
			viewContainerRef = this._fieldControlService.getFstCollection(
				target.id
			);
		} else if (_.includes(targetClassesArr, "buttonDropZone")) {
			viewContainerRef = this.buttonHost;
		} else {
			viewContainerRef = this.host;
		}

		const componentRef = viewContainerRef.createComponent(
			componentFactory,
			null,
			viewContainerRef.injector
		);
		console.log(componentRef);
		this.moveDOMNode(target, value[4], componentRef.location.nativeElement);
		console.log(componentObj);
		this._fieldControlService.setFieldRef(
			componentRef,
			this,
			componentObj.component.name
		);
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
			if (copy.componentName === "FieldSetComponent") {
				copy.components = [];
			}
			if (parentID === "root_drop") {
				viewContainerRef = this.host;
			} else if (parentID === "button_drop") {
				viewContainerRef = this.buttonHost;
			} else {
				viewContainerRef = this._fieldControlService.getFstCollection(
					parentID
				);
			}
			console.log("component props", copy);
			const component = this._formBuilderService.getComponent(
				copy.componentName
			).component;

			const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
				component
			);

			const componentRef = viewContainerRef.createComponent(
				componentFactory
			);

			componentRef.instance.properties = copy;
			console.log("compref props", componentRef.instance.properties);
			console.log(component);
			this._fieldControlService.setFieldRef(
				componentRef,
				this,
				component.name
			);
			this._formJsonService.addComponentToMasterJSON(
				key,
				componentRef,
				copy.parent,
				copy.order
			);
			const target: any = document.querySelector(`#${copy.parent}`);
			target.children[copy.order].generatedKey = key;
			target.children[copy.order].parentComponent = target.id;
			// this._formJsonService.updateMasterJSONOnDrop(target, key, false);
			//this._formJsonService.setMasterJSON(copy, key);

			setTimeout(() => {
				res();
			}, 10);
		});
	}

	async populateFormBuilder(components) {
		if (!components) {
			return;
		}
		for (let i = 0; i < components.length; i++) {
			if (!components[i].hideCondition && components[i].showCondition) {
				components[i].hideCondition = components[i].showCondition;
			}
			await this.createComponentsFromJSON(components[i]);
			if (components[i].components !== undefined) {
				setTimeout(() => {
					this.populateFormBuilder(components[i].components);
				}, 10);
			}
		}
		return;
	}

	runBuilder() {
		this.host.clear();
		this.buttonHost.clear();

		const json =  {"id":"","code":"","formLabel":"","name":"","type":"","disabled":false,"hidden":false,"disableCondition":"","hideCondition":"","active":true,"help":"","components":[{"type":"TXT","hasParent":false,"label":"Username Alphabet","hideLabel":false,"labelPosition":"left","tooltip":"username","customCssClass":"abc","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"username","prefix":"","suffix":"","appliedValidations":["required","alphabet"],"customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"Enter your username here","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_biuakqnyk","order":0,"parent":"root_drop","componentName":"TextComponent"},{"useDelimeter":true,"requiredDecimal":true,"type":"NUM","hasParent":false,"label":"Phone","hideLabel":false,"labelPosition":"left","tooltip":"phone","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"phone","prefix":"","suffix":"","appliedValidations":["required","number_positive"],"customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","minLength":10,"maxLength":10,"events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"Enter your Phone Number here","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_jrbzxdd3a","order":1,"parent":"root_drop","componentName":"NumberComponent"},{"type":"EML","hasParent":false,"label":"Email ","hideLabel":false,"labelPosition":"left","tooltip":"email","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"email","prefix":"@","suffix":"","appliedValidations":["commaseperatedemail"],"customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"Enter your Email here","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_re934v1vk","order":2,"parent":"root_drop","componentName":"EmailComponent"},{"flexiLabel":"blank_9","label":"Blank 9","type":"BLK","width":"50%","key":"_nlfgcgp6w","order":3,"parent":"root_drop","componentName":"BlankComponent","labelAlignment":"left"},{"type":"TXT","hasParent":false,"label":"Course","hideLabel":false,"labelPosition":"left","tooltip":"enter your course","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"course","prefix":"","suffix":"","appliedValidations":["required","alphanumeric"],"customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"Enter your course","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_ld4tn5w06","order":4,"parent":"root_drop","componentName":"TextComponent"},{"inputPropsArray":[{"label":"test","value":""}],"hasParent":false,"label":"Radio","hideLabel":false,"labelPosition":"top","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"radio","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","type":"RAD","key":"_0g4rmud9w","order":5,"parent":"root_drop","componentName":"RadioComponent"},{"label":"Fieldset","description":"","hideLabel":false,"labelPosition":"top","flexiLabel":"fieldset_19","active":true,"components":[{"enableSpellCheck":true,"rows":3,"type":"TXA","hasParent":false,"label":"Description","hideLabel":false,"labelPosition":"left","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"description","prefix":"","suffix":"","appliedValidations":["required"],"customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","minLength":10,"maxLength":15,"events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"100%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_gzdve0zef","order":0,"parent":"_yz4o0hk8k","componentName":"TextAreaComponent"},{"minimumDate":"","maximumDate":"","dateTimeFormat":"","dateFormat":"","type":"DAT","hasParent":false,"label":"Date","hideLabel":false,"labelPosition":"top","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"date","prefix":"","suffix":"","appliedValidations":["required"],"customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"100%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_cxteh4fua","order":1,"parent":"_yz4o0hk8k","componentName":"DateComponent"},{"label":"Fieldset","description":"","hideLabel":false,"labelPosition":"top","flexiLabel":"fieldset_24","active":true,"components":[{"useDelimeter":true,"requiredDecimal":true,"type":"NUM","hasParent":false,"label":"Custom Validation","hideLabel":false,"labelPosition":"top","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"number_25","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":{"yearlimit":{"validatorFn":" if (control.value !== undefined && (isNaN(control.value.year) || control.value.year < 2010)) { return { 'yearlimit': true }; } return null; ","message":"Year should be greater than 2010"},"agelimit":{"validatorFn":"if (control.value !== undefined && (isNaN(control.value) || control.value < 50)) { return { 'agelimit': true }; } return null; ","message":"Age should be greater than 50"}},"jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"100%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_kr2xonlta","order":0,"parent":"_nrmuk309y","componentName":"NumberComponent"},{"type":"TXT","hasParent":false,"label":"Json Logic Validation","hideLabel":false,"labelPosition":"left","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"text_28","prefix":"","suffix":"","appliedValidations":["required"],"customFuncValidation":"","jsonLogicVal":{"json":{"and":[{"===":[{"var":"username.value"},"cool"]},{"===":[{"var":"phone.value"},9811914938]}]},"message":"Json Logic Validation Error."},"formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"100%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_qosu7f5b8","order":1,"parent":"_nrmuk309y","componentName":"TextComponent"}],"type":"FST","width":"100%","hidden":false,"key":"_nrmuk309y","order":2,"parent":"_yz4o0hk8k","componentName":"FieldSetComponent","labelAlignment":"left"}],"type":"FST","width":"100%","hidden":false,"key":"_yz4o0hk8k","order":6,"parent":"root_drop","componentName":"FieldSetComponent","labelAlignment":"left"},{"hasParent":false,"label":"CheckBox ","hideLabel":false,"labelPosition":"left","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"checkbox_30","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"100%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","type":"CHK","key":"_sh9q4yjm1","order":7,"parent":"root_drop","componentName":"CheckboxComponent"},{"type":"TIM","hasParent":false,"label":"Time ","hideLabel":false,"labelPosition":"left","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"time_33","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"33%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_9fxyj5xo1","order":8,"parent":"root_drop","componentName":"TimeComponent"},{"type":"MON","hasParent":false,"label":"Month","hideLabel":false,"labelPosition":"left","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"month_35","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"33%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","key":"_iozo415tt","order":9,"parent":"root_drop","componentName":"MonthComponent"},{"hasParent":false,"label":"Date Time ","hideLabel":false,"labelPosition":"left","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"date_time_38","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"33%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","type":"DTI","key":"_86alzum0y","order":10,"parent":"root_drop","componentName":"DateTimeComponent"}],"buttons":[{"theme":"primary","size":"small","btnLeftIcon":"","btnRightIcon":"","hasParent":false,"label":"IconicButton 40","hideLabel":false,"labelPosition":"top","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"iconicbutton_40","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"","icon":"md-search","parentName":"","filterSqlQuery":"","labelAlignment":"center","type":"ICB","key":"_wsj4yl1yi","order":0,"parent":"button_drop","componentName":"IconicButtonComponent"},{"theme":"danger","size":"small","btnLeftIcon":"md-close","btnRightIcon":"","hasParent":false,"label":"Close","hideLabel":false,"labelPosition":"top","marginTop":"","marginRight":"","marginLeft":"","marginBottom":"","defaultValueType":"none","defaultValueSqlQuery":"","defaultValueString":"","lovType":"none","lovSqlQuery":"","lovJson":"","nonPersistent":false,"hidden":false,"clearWhenHidden":false,"disabled":false,"flexiLabel":"button_42","prefix":"","suffix":"","appliedValidations":"","customFuncValidation":"","jsonLogicVal":"","formClassValidation":"","events":"","hideCondition":"","disableCondition":"","active":true,"required":false,"labelWidth":"","labelMargin":"","width":"50%","mask":[],"description":"","icon":"","parentName":"","filterSqlQuery":"","labelAlignment":"left","type":"BTN","key":"_ew91z0oyq","order":1,"parent":"button_drop","componentName":"ButtonComponent"}]};
		this.populateFormBuilder(json.components);
		setTimeout(() => {
			this.populateFormBuilder(json.buttons);
		}, 10);
	}

	save() {
		this._formBuilderService.postData(this.finalJSON).subscribe(
			res => {
				alert("FORM SAVED");
				console.log(res);
			},
			err => {
				console.log("getting error", err);
			}
		);
	}

	reset() {}

	renderPreview() {
		this._formJsonService.buildFinalJSON();
		this.finalJSON = this._formJsonService.getFinalJSON();
		this.previewJSON = _.assign({}, this.finalJSON);
		this._bootstrapService.openModal(this.preview, { size: "lg" });
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

	get type() {
		return this.formJson.type;
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

	set type(type) {
		this.formJson.type = type;
	}

	set disabled(disabled) {
		this.formJson.disabled = disabled;
	}

	set hidden(hidden) {
		this.formJson.hidden = hidden;
	}

	set disableCondition(disableCondition) {
		this.formJson.disableCondition = disableCondition;
	}

	set hideCondition(hideCondition) {
		this.formJson.hideCondition = hideCondition;
	}

	get hideCondition() {
		return this.formJson.hideCondition;
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
