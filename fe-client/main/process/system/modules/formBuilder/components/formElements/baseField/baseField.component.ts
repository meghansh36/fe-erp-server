import { FormMasterService } from "@L3Process/system/modules/formBuilder/services/formMaster.service";
import { FieldControlService } from "@L3Process/system/modules/formBuilder/services/fieldControl.service";
import {
  Injectable,
  OnInit,
  Renderer2,
  ElementRef,
  DoCheck,
  AfterViewInit
} from "@angular/core";
import { FormJsonService } from "@L3Process/system/modules/formBuilder/services/formJson.service";
import { UtilityService } from "@L3Process/system/services/utility.service";
import { DefaultsService } from "@L3Process/system/services/defaults.service";
import * as _ from "lodash";

@Injectable()
export class FeBaseField implements OnInit, DoCheck, AfterViewInit {
  showEdit = true;
  uniqueKey: string;
  refObj: any;
  componentname: string;
  public formDisabled: boolean;
  public formHidden: boolean;
  public defaultClasses: any;
  public style: any;
  protected _systemValidations: any;

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
    showCondition: true,
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
    filterSqlQuery: true
  };

  //All properties
  /* public applicableProperties: any = {
		hasParent:true,
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
		lovType: true,
		lovSqlQuery: true,
		lovJson: true,
		nonPersistent: true,
		dbColumn: true,
		hidden: true,
		clearWhenHidden: true,
		disabled: true,
		flexiLabel: true,
		prefix: true,
		suffix: true,
		appliedValidations: true,
		customFuncValidation: true,
		jsonLogicVal: true,
		formClassValidation: true,
		minimumLength: true,
		maximumLength: true,
		events: true,
		showCondition: true,
		type: true,
		disableCondition: true,
		active: true,
		required: true,
		labelWidth: true,
		labelMargin: true,
		width: true,
		icon: true,
		parentName: true,
		filterSqlQuery: true

	}; */

  public properties: any = {
    hasParent: false,
    label: undefined,
    hideLabel: false,
    labelPosition: "top",
    tooltip: undefined,
    errorLabel: undefined,
    customCssClass: undefined,
    tabIndex: undefined,
    marginTop: "",
    marginRight: "",
    marginLeft: "",
    marginBottom: "",
    defaultValueType: "none",
    defaultValueSqlQuery: "",
    defaultValueString: "",
    lovType: "none",
    lovSqlQuery: "",
    lovJson: "",
    nonPersistent: false,
    dbColumn: undefined,
    componentname: undefined,
    hidden: false,
    clearWhenHidden: false,
    disabled: false,
    flexiLabel: undefined,
    prefix: "",
    suffix: "",
    appliedValidations: "",
    customFuncValidation: "",
    jsonLogicVal: "",
    formClassValidation: "",
    minimumLength: undefined,
    maximumLength: undefined,
    events: "",
    showCondition: "",
    disableCondition: "",
    active: true,
    required: false,
    labelWidth: "",
    labelMargin: "",
    width: "",
    mask: [],
    description: "",
    icon: "",
    parentName: "",
    filterSqlQuery: ""
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
    this._utility.renderer = this._render;
    this.systemValidations = this._defaults.VALIDATIONS;
  }

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

  _init() {
    this.setRef(this._fieldControlService.getFieldRef().ref);
    this.uniqueKey = this._masterFormService.getCurrentKey();
    this._masterFormService.setProperties(this.properties, this.uniqueKey);
    this._initFieldStyle();
    this.systemValidations = this._defaults.VALIDATIONS;
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

  protected _initFieldStyle() {
    this.defaultClasses = this._utility.getFieldClasses(this, true);
    this.style = this._utility.getFieldStyles(this, true);
  }

  protected _beforeSetDefaultClasses(classes) {
    return classes;
  }

  protected _beforeSetDefaultStyle(styleObj) {
    return styleObj;
  }

  public setRef(reference) {
    this.refObj = reference;
  }

  protected close() {
    this.refObj.destroy();
    this._formJsonService.removeComponent(this.uniqueKey);
    this._formJsonService.buildFinalJSON();
  }

  openModal() {
    this._masterFormService.setCurrentKey(this.uniqueKey);
    this._masterFormService.setProperties(this.properties, this.uniqueKey);
    this._fieldControlService.getFieldRef().parent.openModal();
  }

  protected update(propsFromMasterForm) {
    this.properties = _.assignIn({}, propsFromMasterForm);
  }

  //Properties getters
  get label() {
    return this.properties.label;
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

  get minimumLength() {
    return this.properties.minimumLength;
  }

  get maximumLength() {
    return this.properties.maximumLength;
  }

  get events() {
    return this.properties.events;
  }

  get showCondition() {
    return this.properties.showCondition;
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

  set minimumLength(minimumLength) {
    this.properties.minimumLength = minimumLength;
  }

  set maximumLength(maximumLength) {
    this.properties.maximumLength = maximumLength;
  }

  set events(events) {
    this.properties.events = events;
  }

  set showCondition(showCondition) {
    this.properties.showCondition = showCondition;
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

  /* set cssClasses( classes ) {
		this._cssClasses = classes;
	} */
}
