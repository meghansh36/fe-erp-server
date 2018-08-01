 /* @Component Description
  *
  * BaseField Component is the parent class of all the field components.
  */
import { FormMasterService } from "@L3Modules/system/controllers/formBuilder/services/formMaster.service";
import { FieldControlService } from "@L3Modules/system/controllers/formBuilder/services/fieldControl.service";
import {
  Injectable,
  OnInit,
  Renderer2,
  ElementRef,
  DoCheck,
  AfterViewInit,
  OnChanges
} from "@angular/core";
import { FormJsonService } from "@L3Modules/system/controllers/formBuilder/services/formJson.service";
import { UtilityService } from "@L3Modules/system/services/utility.service";
import { DefaultsService } from "@L3Modules/system/services/defaults.service";
import * as _ from "lodash";

@Injectable()
export class FeBaseField implements OnInit, DoCheck, AfterViewInit {
  // uses fieldcount to append to default labels of each field component.
  static fieldCount = 0;
  // set showEdit to true. Displays the toolbar over field components.
  showEdit = true;
  uniqueKey: string;
  refObj: any;
  componentname: string;

  public formDisabled: boolean;
  public formHidden: boolean;
  public defaultClasses: any;
  public style: any;
  protected _systemValidations: any;

  // list of all the common applicable properties that will be shown in the form properties modal
  public applicableProperties: any = {
    label: true,
    hideLabel: true,
    labelPosition: true,
    tooltip: true,
    customCssClass: true,
    tabIndex: true,
    marginTop: true,
    marginRight: true,
    marginLeft: true,
    marginBottom: true,
    defaultValueType: true,
    defaultValueSqlQuery: true,
    defaultValueString: true,
    nonPersistent: true,
    dbColumn: true,
    hidden: true,
    clearWhenHidden: false,
    disabled: true,
    flexiLabel: true,
    appliedValidations: true,
    customFuncValidation: true,
    jsonLogicVal: true,
    formClassValidation: true,
    events: true,
    hideCondition: true,
    type: true,
    disableCondition: true,
    active: true,
    required: true,
    labelWidth: true,
    labelMargin: true,
    width: true,
    description: true,
    hasParent: true,
    parentName: true,
	  filterSqlQuery: true,
	  labelAlignment: true
  };

  // list of all the common field properties that can be set in form properties modal.
  public properties: any = {
    hasParent: false,
    label: undefined,
    hideLabel: false,
    labelPosition: 'top',
    tooltip: undefined,
    errorLabel: undefined,
    customCssClass: undefined,
    tabIndex: undefined,
    marginTop: '',
    marginRight: "",
    marginLeft: "",
    marginBottom: "",
    defaultValueType: "none",
    defaultValueSqlQuery: "",
    defaultValueString: "",
    lovType: "none",
    lovSqlQuery: '',
    lovJson: '',
    nonPersistent: false,
    dbColumn: undefined,
    componentname: undefined,
    hidden: false,
    clearWhenHidden: false,
    disabled: false,
    flexiLabel: undefined,
    prefix: '',
    suffix: '',
    appliedValidations: '',
    customFuncValidation: '',
    jsonLogicVal: '',
    formClassValidation: '',
    minLength: undefined,
    maxLength: undefined,
    events: '',
    hideCondition: '',
    disableCondition: '',
    active: true,
    required: false,
    labelWidth: '',
    labelMargin: '',
    width: '',
    mask: [],
    description: '',
    icon: '',
    parentName: '',
	  filterSqlQuery: '',
	  labelAlignment: ''
  };

  constructor(
    protected _elemRef: ElementRef,
    protected _fieldControlService: FieldControlService,
    protected _masterFormService: FormMasterService,
    protected _formJsonService: FormJsonService,
    protected _render: Renderer2,
    protected _utility: UtilityService,
    protected _defaults: DefaultsService
  ) {
  // set the renderer in the utility service
  this._utility.renderer = this._render;
  // get default validations
  this.systemValidations = this._defaults.VALIDATIONS;
  // increase the fieldcount value
	FeBaseField.fieldCount++;
  }

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

 /* @function Description
  *
  * This function initializes the styles and properties of the field component.
  */
  _init() {
    // set field reference from the service
    this.setRef(this._fieldControlService.getFieldRef().ref);
    // get component key
    this.uniqueKey = this._masterFormService.getCurrentKey();
    // set intial defualt properties in the masterJSON
    this._masterFormService.setProperties(this.properties, this.uniqueKey);
    // call function to set field styles
    this._initFieldStyle();
    // set validations
    this.systemValidations = this._defaults.VALIDATIONS;
    // set intial default label
	  if (!this.label) {
		this.label = `${this._defaults.FIELD_TYPE_LABEL_MAP[ this.type ]} ${FeBaseField.fieldCount.toString()}`;
	}

  // set intial default flexiLabel
	if (!this.flexiLabel) {
		let flexiLabelPrefix = this._defaults.FIELD_TYPE_LABEL_MAP[ this.type ];
		if ( flexiLabelPrefix ) {
			flexiLabelPrefix = flexiLabelPrefix.toLowerCase().replace(' ', '_');
		}
		this.flexiLabel = `${flexiLabelPrefix}_${FeBaseField.fieldCount.toString()}`;
	}
  }

  protected _beforeNgAfterViewInit() {}

  ngAfterViewInit() {
    this._beforeNgAfterViewInit();
    this._utility.addDisplayProps(this);
    this._afterNgAfterViewInit();
  }

  protected _afterNgAfterViewInit() {}

  protected _beforeNgDoCheck() {}

  protected _afterNgDoCheck() {}

  ngDoCheck() {
    this._beforeNgDoCheck();
    this._initFieldStyle();
    this._utility.addDisplayProps(this);
    this._afterNgDoCheck();
  }
 /* @function Description
  *
  * sets ngClass and ngStyle properties for each field
  */
  protected _initFieldStyle() {
    // get classes for ngClass
    this.defaultClasses = this._utility.getFieldClasses(this, true);
    // get styles for ngStyle
    this.style = this._utility.getFieldStyles(this, true);
  }

  protected _beforeSetDefaultClasses(classes) {
    return classes;
  }

  protected _beforeSetDefaultStyle(styleObj) {
    return styleObj;
  }
 /* @function Description
  * Arguments ==> reference - component reference
  * 
  * Sets refObj which contains the component reference returned by angular when a dynamic
  * component is created
  */
  public setRef(reference) {
    this.refObj = reference;
  }

 /* @function Description
  *
  * fires on click event(close button in field toolbar). The component is removed from view 
  * and is also removed from the MasterJson
  */
  protected close() {
    // angular function to destroy component from view.
    this.refObj.destroy();
    // removes component from the MasterJSON
    this._formJsonService.removeComponent(this.uniqueKey);
    // builds new finalJSON
    this._formJsonService.buildFinalJSON();
  }

 /* @function Description
  *
  * This function opens the modal when settings button in toolbar is clicked.
  */
  openModal() {
    // set current key in formMaster service
    this._masterFormService.setCurrentKey(this.uniqueKey);
    // get the instance of formBuilder component
    const parent = this._fieldControlService.getFieldRef().parent;
    this._fieldControlService.setFieldRef(this.refObj, parent, this.properties.componentName);
    // calls the openModal function in the formBuilder
    parent.openModal();
  }

 /* @function Description
  *
  * Updates field properties
  */
  protected update(propsFromMasterForm) {
    this.properties = _.assignIn({}, propsFromMasterForm);
  }

  get label() {
    return this.properties.label;
  }

  set label( label ) {
    this.properties.label = label;
  }

  get hideLabel() {
    return this.properties.hideLabel;
  }

  get labelPosition() {
    return this.properties.labelPosition;
  }

  get tooltip() {
    return this.properties.tooltip;
  }

  get customCssClass() {
    return this.properties.customCssClass;
  }

  get tabIndex() {
    return this.properties.tabIndex;
  }

  get marginTop() {
    return this.properties.marginTop;
  }

  get marginRight() {
    return this.properties.marginRight;
  }

  get marginLeft() {
    return this.properties.marginLeft;
  }

  get marginBottom() {
    return this.properties.marginBottom;
  }

  get defaultValueType() {
    return this.properties.defaultValueType;
  }

  get defaultValueSqlQuery() {
    return this.properties.defaultValueSqlQuery;
  }

  get defaultValueString() {
    return this.properties.defaultValueString;
  }

  get lovType() {
    return this.properties.lovType;
  }

  get lovSqlQuery() {
    return this.properties.lovSqlQuery;
  }

  get lovJson() {
    return this.properties.lovJson;
  }

  get nonPersistent() {
    return this.properties.nonPersistent;
  }

  get dbColumn() {
    return this.properties.dbColumn;
  }

  get hidden() {
    return this.properties.hidden || this.formHidden;
  }

  get clearWhenHidden() {
    return this.properties.clearWhenHidden;
  }

  get disabled() {
    return this.properties.disabled || this.formDisabled;
  }

  get flexiLabel() {
    return this.properties.flexiLabel;
  }

  get prefix() {
    return this.properties.prefix;
  }

  get suffix() {
    return this.properties.suffix;
  }

  get appliedValidations() {
    return this.properties.appliedValidations;
  }

  get customFuncValidation() {
    return this.properties.customFuncValidation;
  }

  get jsonLogicVal() {
    return this.properties.jsonLogicVal;
  }

  get formClassValidation() {
    return this.properties.formClassValidation;
  }

  get minLength() {
    return this.properties.minLength;
  }

  get maxLength() {
    return this.properties.maxLength;
  }

  get events() {
    return this.properties.events;
  }

  get hideCondition() {
    return this.properties.hideCondition;
  }

  get type() {
    return this.properties.type;
  }

  get disableCondition() {
    return this.properties.disableCondition;
  }

  get active() {
    return this.properties.active;
  }

  get required() {
    return this.properties.required;
  }

  get mask() {
    return this.properties.mask;
  }

  get labelWidth() {
    return this.properties.labelWidth;
  }

  get width() {
    return this.properties.width;
  }

  get description() {
    return this.properties.description;
  }

  get labelMargin() {
    return this.properties.labelMargin;
  }

  get systemValidations() {
    return this._systemValidations;
  }

  set systemValidations(systemValidations) {
    this._systemValidations = systemValidations;
  }

  set hideLabel(hideLabel) {
    this.properties.hideLabel = hideLabel;
  }

  set labelPosition(labelPosition) {
    this.properties.labelPosition = labelPosition;
  }

  set tooltip(tooltip) {
    this.properties.tooltip = tooltip;
  }

  set customCssClass(customCssClass) {
    this.properties.customCssClass = customCssClass;
  }

  set tabIndex(tabIndex) {
    this.properties.tabIndex = tabIndex;
  }

  set marginTop(marginTop) {
    this.properties.marginTop = marginTop;
  }

  set marginRight(marginRight) {
    this.properties.marginRight = marginRight;
  }

  set marginLeft(marginLeft) {
    this.properties.marginLeft = marginLeft;
  }

  set marginBottom(marginBottom) {
    this.properties.marginBottom = marginBottom;
  }

  set defaultValueType(defaultValueType) {
    this.properties.defaultValueType = defaultValueType;
  }

  set defaultValueSqlQuery(defaultValueSqlQuery) {
    this.properties.defaultValueSqlQuery = defaultValueSqlQuery;
  }

  set defaultValueString(defaultValueString) {
    this.properties.defaultValueString = defaultValueString;
  }

  set lovType(lovType) {
    this.properties.lovType = lovType;
  }

  set lovSqlQuery(lovSqlQuery) {
    this.properties.lovSqlQuery = lovSqlQuery;
  }

  set lovJson(lovJson) {
    this.properties.lovJson = lovJson;
  }

  set nonPersistent(nonPersistent) {
    this.properties.nonPersistent = nonPersistent;
  }

  set dbColumn(dbColumn) {
    this.properties.dbColumn = dbColumn;
  }

  set hidden(hidden) {
    this.properties.hidden = hidden;
  }

  set clearWhenHidden(clearWhenHidden) {
    this.properties.clearWhenHidden = clearWhenHidden;
  }

  set disabled(disabled) {
    this.properties.disabled = disabled;
  }

  set flexiLabel(flexiLabel) {
    this.properties.flexiLabel = flexiLabel;
  }

  set prefix(prefix) {
    this.properties.prefix = prefix;
  }

  set suffix(suffix) {
    this.properties.suffix = suffix;
  }

  set appliedValidations(appliedValidations) {
    this.properties.appliedValidations = appliedValidations;
  }

  set customFuncValidation(customFuncValidation) {
    this.properties.customFuncValidation = customFuncValidation;
  }

  set jsonLogicVal(jsonLogicVal) {
    this.properties.jsonLogicVal = jsonLogicVal;
  }

  set formClassValidation(formClassValidation) {
    this.properties.formClassValidation = formClassValidation;
  }

  set minLength(minLength) {
    this.properties.minLength = minLength;
  }

  set maxLength(maxLength) {
    this.properties.maxLength = maxLength;
  }

  set events(events) {
    this.properties.events = events;
  }

  set hideCondition(hideCondition) {
    this.properties.hideCondition = hideCondition;
  }

  set type(type) {
    this.properties.type = type;
  }

  set disableCondition(disableCondition) {
    this.properties.disableCondition = disableCondition;
  }

  set active(active) {
    this.properties.active = active;
  }

  set required(required) {
    this.properties.required = required;
  }

  set labelWidth(labelWidth) {
    this.properties.labelWidth = labelWidth;
  }

  set labelMargin(labelMargin) {
    this.properties.labelMargin = labelMargin;
  }

  set width(width) {
    this.properties.width = width;
  }

  get labelAlignment() {
    return this.properties.labelAlignment;
  }

  set labelAlignment(labelAlignment) {
    this.properties.labelAlignment = labelAlignment;
  }
}
