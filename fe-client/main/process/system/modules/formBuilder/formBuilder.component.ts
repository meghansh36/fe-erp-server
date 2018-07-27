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
import { DefaultsService } from "@L3Process/system/services/defaults.service";
import { ActivatedRoute } from "@angular/router";
import { FormSchemaService } from "@L3Main/services/formSchema.service";

@Component({
	selector: "form-builder",
	templateUrl: "./formBuilder.component.html",
	styleUrls: ["./formBuilder.component.css"]
})
export class FeFormBuilderComponent implements DoCheck, OnInit, AfterViewInit {
	@ViewChild("host", { read: ViewContainerRef })
	host: ViewContainerRef;
	@ViewChild("buttonHost", { read: ViewContainerRef })
	buttonHost: ViewContainerRef;
	@ViewChild("content") content;
	@ViewChild("preview") preview;
	cond: Boolean = false;
	basic: String = "basic";
	advanced: String = "advanced";
	modalRef: any;
	previewJSON: any;
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
		protected _renderer: Renderer2,
		protected _defaults: DefaultsService,
		protected _route: ActivatedRoute,
		protected _formSchemaService: FormSchemaService
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
				    _.includes(fieldClassesArr, "button-input")
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
			const componentName = value[1].attributes.getNamedItem(
				"componentName"
			).nodeValue;
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
	/* async populateFormBuilder(components, i) {
    console.log('total comp', components, i);
    if (i > components.length) {
      return;
    }
    console.log('components[i].components', components[i].components);
    if (components[i].components === undefined) {
      await this.createComponentsFromJSON(components[i]);
      console.log('next iter', components);
      this.populateFormBuilder(components, i + 1);
    } else if(components[i].components !== undefined){
      await this.createComponentsFromJSON(components[i]);
      console.log('next recur', components[i].components)
      this.populateFormBuilder(components[i].components, 0)
    }
  } */

	runBuilder() {
		this.host.clear();
		this.buttonHost.clear();

		const json =  {
			"id": 1,
			"code": "",
			"formLabel": "testing",
			"name": "",
			"type": "",
			"disabled": false,
			"hidden": false,
			"disableCondition": "",
			"hideCondition": "",
			"active": true,
			"help": "",
			"components": [
			  {
				"type": "TXT",
				"hasParent": false,
				"label": "Single Email 28",
				"hideLabel": false,
				"labelPosition": "top",
				"tooltip": "dfgdgdfgdfgd",
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
				"flexiLabel": "text_28",
				"prefix": "",
				"suffix": "",
				"appliedValidations": [
				  "required",
				  "email"
				],
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "50%",
				"mask": [],
				"description": "sdfdsfdfdncfgdfeefsgfnbmnbnfgdfe",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_6p42q481c",
				"order": 0,
				"parent": "root_drop",
				"componentName": "TextComponent"
			  },
			  {
				"type": "TXT",
				"hasParent": false,
				"label": "Multiple Email 30",
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
				"flexiLabel": "text_30",
				"prefix": "",
				"suffix": "",
				"appliedValidations": [
				  "required",
				  "commaseperatedemail"
				],
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "50%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_fwcca7dv6",
				"order": 1,
				"parent": "root_drop",
				"componentName": "TextComponent"
			  },
			  {
				"type": "TXT",
				"hasParent": false,
				"label": "Alphabet 21",
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
				"flexiLabel": "text_21",
				"prefix": "",
				"suffix": "",
				"appliedValidations": [
				  "required",
				  "alphabet"
				],
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_sgd55c4yf",
				"order": 2,
				"parent": "root_drop",
				"componentName": "TextComponent"
			  },
			  {
				"label": "Fieldset",
				"description": "",
				"hideLabel": false,
				"labelPosition": "top",
				"flexiLabel": "fieldset_36",
				"active": true,
				"components": [
				  {
					"type": "TXT",
					"hasParent": false,
					"label": "Alphanumeric 37",
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
					"flexiLabel": "text_37",
					"prefix": "",
					"suffix": "",
					"appliedValidations": [
					  "required",
					  "alphanumeric"
					],
					"customFuncValidation": "",
					"jsonLogicVal": "",
					"formClassValidation": "",
					"events": "",
					"hideCondition": "",
					"disableCondition": "",
					"active": true,
					"required": false,
					"labelWidth": "",
					"labelMargin": "",
					"width": "100%",
					"mask": [],
					"description": "",
					"icon": "",
					"parentName": "",
					"filterSqlQuery": "",
					"labelAlignment": "left",
					"key": "_hgv23ppk8",
					"order": 0,
					"parent": "_f6vee7u3o",
					"componentName": "TextComponent"
				  },
				  {
					"useDelimeter": true,
					"requiredDecimal": true,
					"type": "NUM",
					"hasParent": false,
					"label": "Number Negative 25",
					"hideLabel": false,
					"labelPosition": "top",
					"tooltip": "WERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNB",
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
					"flexiLabel": "number_25",
					"prefix": "",
					"suffix": "",
					"appliedValidations": [
					  "required",
					  "number_negative"
					],
					"customFuncValidation": "",
					"jsonLogicVal": "",
					"formClassValidation": "",
					"events": "",
					"hideCondition": "",
					"disableCondition": "",
					"active": true,
					"required": false,
					"labelWidth": "",
					"labelMargin": "",
					"width": "50%",
					"mask": [],
					"description": "WERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNBWERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNBWERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNBWERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNBWERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNBWERSFDFWQEQWDXCGFHGWEQWEWEDGFCVHHVGHGREWEFDGNB",
					"icon": "",
					"parentName": "",
					"filterSqlQuery": "",
					"labelAlignment": "left",
					"key": "_n0a5cuy0m",
					"order": 1,
					"parent": "_f6vee7u3o",
					"componentName": "NumberComponent"
				  },
				  {
					"useDelimeter": true,
					"requiredDecimal": true,
					"type": "NUM",
					"hasParent": false,
					"label": "Number Positive 23",
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
					"flexiLabel": "number_23",
					"prefix": "",
					"suffix": "",
					"appliedValidations": [
					  "required",
					  "number_positive"
					],
					"customFuncValidation": "",
					"jsonLogicVal": "",
					"formClassValidation": "",
					"events": "",
					"hideCondition": "",
					"disableCondition": "",
					"active": true,
					"required": false,
					"labelWidth": "",
					"labelMargin": "",
					"width": "50%",
					"mask": [],
					"description": "",
					"icon": "",
					"parentName": "",
					"filterSqlQuery": "",
					"labelAlignment": "left",
					"key": "_9r0u8lneb",
					"order": 2,
					"parent": "_f6vee7u3o",
					"componentName": "NumberComponent"
				  }
				],
				"type": "FST",
				"width": "100%",
				"hidden": false,
				"key": "_f6vee7u3o",
				"order": 3,
				"parent": "root_drop",
				"componentName": "FieldSetComponent",
				"labelAlignment": "left"
			  },
			  {
				"type": "TXT",
				"hasParent": false,
				"label": "sbsb",
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
				"disabled": true,
				"flexiLabel": "sbhs",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"key": "_bylpurmom",
				"order": 4,
				"parent": "root_drop",
				"componentName": "TextComponent",
				"labelAlignment": "left",
				"tooltip": "Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip"
			  },
			  {
				"type": "MCH",
				"hasParent": false,
				"label": "Multiple Checkboxes 2",
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
				"flexiLabel": "multiple_checkboxes_2",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_3ngklqyxm",
				"order": 5,
				"parent": "root_drop",
				"componentName": "SelectBoxComponent"
			  },
			  {
				"inputPropsArray": [
				  {
					"label": "test",
					"value": ""
				  }
				],
				"hasParent": false,
				"label": "Radio 4",
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
				"flexiLabel": "radio_4",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"type": "RAD",
				"key": "_9chh9al8v",
				"order": 6,
				"parent": "root_drop",
				"componentName": "RadioComponent"
			  },
			  {
				"hasParent": false,
				"label": "Anchor 6",
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
				"flexiLabel": "anchor_6",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"type": "ANC",
				"key": "_fasiy86bj",
				"order": 7,
				"parent": "root_drop",
				"componentName": "AnchorComponent"
			  },
			  {
				"hasParent": false,
				"label": "CheckBox 9",
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
				"flexiLabel": "checkbox_9",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"type": "CHK",
				"key": "_32hqq63lu",
				"order": 8,
				"parent": "root_drop",
				"componentName": "CheckboxComponent"
			  },
			  {
				"flexiLabel": "blank_11",
				"label": "Blank 11",
				"type": "BLK",
				"width": "100%",
				"key": "_8umd5kgtw",
				"order": 9,
				"parent": "root_drop",
				"componentName": "BlankComponent",
				"labelAlignment": "left"
			  },
			  {
				"hasParent": false,
				"label": "Hidden 13",
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
				"flexiLabel": "hidden_13",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"type": "HID",
				"key": "_sm2zdbbia",
				"order": 10,
				"parent": "root_drop",
				"componentName": "HiddenComponent"
			  },
			  {
				"minimumDate": "",
				"maximumDate": "",
				"dateTimeFormat": "",
				"dateFormat": "",
				"type": "DAT",
				"hasParent": false,
				"label": "Date 15",
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
				"flexiLabel": "date_15",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_ty4ekfhjc",
				"order": 11,
				"parent": "root_drop",
				"componentName": "DateComponent"
			  },
			  {
				"type": "MON",
				"hasParent": false,
				"label": "Month 17",
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
				"flexiLabel": "month_17",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_eord128f3",
				"order": 12,
				"parent": "root_drop",
				"componentName": "MonthComponent"
			  },
			  {
				"theme": "default",
				"size": "small",
				"btnLeftIcon": "",
				"btnRightIcon": "",
				"hasParent": false,
				"label": "Button 19",
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
				"flexiLabel": "button_19",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "50%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "right",
				"type": "BTN",
				"key": "_j2ysmn3yi",
				"order": 13,
				"parent": "root_drop",
				"componentName": "ButtonComponent"
			  },
			  {
				"type": "SEL",
				"hasParent": false,
				"label": "Select 21",
				"hideLabel": false,
				"labelPosition": "top",
				"tooltip": " Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip Tooltip",
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
				"flexiLabel": "select_21",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "50%",
				"mask": [],
				"description": "Descriptions DescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptions",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "center",
				"key": "_5y3zry3x5",
				"order": 14,
				"parent": "root_drop",
				"componentName": "SelectComponent"
			  },
			  {
				"theme": "default",
				"size": "small",
				"btnLeftIcon": "",
				"btnRightIcon": "",
				"hasParent": false,
				"label": "IconicButton 33",
				"hideLabel": false,
				"labelPosition": "top",
				"tooltip": "TooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltip",
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
				"flexiLabel": "iconicbutton_33",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "50%",
				"mask": [],
				"description": "DescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptionsDescriptions",
				"icon": "md-search",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "center",
				"type": "ICB",
				"key": "_26bmd84mo",
				"order": 15,
				"parent": "root_drop",
				"componentName": "IconicButtonComponent"
			  },
			  {
				"hasParent": false,
				"label": "File 36",
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
				"flexiLabel": "file_36",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "50%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"fileMinimumSize": "",
				"fileMaximumSize": "",
				"type": "FILE",
				"key": "_f3v9hxcup",
				"order": 16,
				"parent": "root_drop",
				"componentName": "FileComponent"
			  },
			  {
				"hasParent": false,
				"label": "Date Time 38",
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
				"flexiLabel": "date_time_38",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"type": "DTI",
				"key": "_85xpy6cnq",
				"order": 17,
				"parent": "root_drop",
				"componentName": "DateTimeComponent"
			  },
			  {
				"type": "EML",
				"hasParent": false,
				"label": "Email 45",
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
				"flexiLabel": "email_45",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "right",
				"key": "_5lqj6m01z",
				"order": 18,
				"parent": "root_drop",
				"componentName": "EmailComponent"
			  },
			  {
				"type": "TIM",
				"hasParent": false,
				"label": "Time 40",
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
				"flexiLabel": "time_40",
				"prefix": "",
				"suffix": "",
				"appliedValidations": "",
				"customFuncValidation": "",
				"jsonLogicVal": "",
				"formClassValidation": "",
				"events": "",
				"hideCondition": "",
				"disableCondition": "",
				"active": true,
				"required": false,
				"labelWidth": "",
				"labelMargin": "",
				"width": "100%",
				"mask": [],
				"description": "",
				"icon": "",
				"parentName": "",
				"filterSqlQuery": "",
				"labelAlignment": "left",
				"key": "_zhignoidm",
				"order": 19,
				"parent": "root_drop",
				"componentName": "TimeComponent"
			  },
			  {
				"label": "Fieldset",
				"description": "",
				"hideLabel": false,
				"labelPosition": "top",
				"flexiLabel": "fieldset_42",
				"active": true,
				"components": [
				  {
					"type": "ACS",
					"hasParent": false,
					"label": "Auto Complete 43",
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
					"flexiLabel": "auto_complete_43",
					"prefix": "",
					"suffix": "",
					"appliedValidations": "",
					"customFuncValidation": "",
					"jsonLogicVal": "",
					"formClassValidation": "",
					"events": "",
					"hideCondition": "",
					"disableCondition": "",
					"active": true,
					"required": false,
					"labelWidth": "",
					"labelMargin": "",
					"width": "100%",
					"mask": [],
					"description": "",
					"icon": "",
					"parentName": "",
					"filterSqlQuery": "",
					"labelAlignment": "left",
					"key": "_ue3o9qyi5",
					"order": 0,
					"parent": "_ut01mlp7p",
					"componentName": "AutoCompleteComponent"
				  },
				  {
					"ckSettings": "",
					"enableSpellCheck": true,
					"rows": 5,
					"type": "HTML",
					"hasParent": false,
					"label": "Html Editor 44",
					"hideLabel": false,
					"labelPosition": "top",
					"tooltip": "TooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltipTooltip",
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
					"flexiLabel": "html_editor_44",
					"prefix": "",
					"suffix": "",
					"appliedValidations": "",
					"customFuncValidation": "",
					"jsonLogicVal": "",
					"formClassValidation": "",
					"events": "",
					"hideCondition": "",
					"disableCondition": "",
					"active": true,
					"required": false,
					"labelWidth": "",
					"labelMargin": "",
					"width": "100%",
					"mask": [],
					"description": "DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription",
					"icon": "",
					"parentName": "",
					"filterSqlQuery": "",
					"labelAlignment": "left",
					"key": "_hngayizqi",
					"order": 1,
					"parent": "_ut01mlp7p",
					"componentName": "HTMLComponent"
				  }
				],
				"type": "FST",
				"width": "100%",
				"hidden": false,
				"key": "_ut01mlp7p",
				"order": 20,
				"parent": "root_drop",
				"componentName": "FieldSetComponent",
				"labelAlignment": "left"
			  }
			],
			"buttons": [],
			"formcode": null
		  };
		this.populateFormBuilder(json.components);
		setTimeout(() => {
			this.populateFormBuilder(json.buttons);
		}, 10);
	}

	save() {
		this._formBuilderService.postData(this.finalJSON).subscribe(
			res => {
				alert("data received");
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
