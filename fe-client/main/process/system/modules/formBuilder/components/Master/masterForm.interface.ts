

export interface builderFieldCompInterface{
  code: string;
  name: string;
  type: string;
  flexiLabel: string;
  label: string;
  hideLabel: boolean;
  labelPosition: string;
  labelWidth: number;
  labelMargin: number;
  width: string;
  placeholder: string;
  description: string;
  tooltip: string;
  errorLabel: string;
  inputMask: string;
  prefix: string;
  suffix: string;
  customCssClass: string;
  tabIndex: string;
  clearWhenHidden: boolean;
  hidden: boolean;
  disabled: boolean;
  defaultValueType: string;
  defaultValueSqlQuery: string;
  defaultValueStringValue:  string;
  lovType:  string;
  lovSqlQuery:  string;
  lovJson:  string;
  nonPersistent: string;
  dbColumn: string;
  validations: string;
  minimumLength: number;
  maximumLength: number;
  regularExpression: string;
  customErrorFunction: string;
  JSONLogic: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  condition: string;
  // customValFuncFlag:  string | boolean;
  customFuncValidationVal:  string;
  // jsonLogicValFlag:  string | boolean;
  jsonLogicVal:  string;
  // formClassValFlag:  string | boolean;
  formLevelValidationVal:  string;
  enableSpellCheck:  boolean | string;
  allowMultipleAddress:  boolean | string;
  enalbeCk:  boolean | string;
  ckSettings:  string;
  rows:  number;
  minimumDate:  string;
  maximumDate:  string;
  btTheme:  string;
  btnSize:  string;
  btnLeftIcon:   string;
  btnRightIcon:  string;
  btnAction:  string;
  btnActArgs:  string;
  useDelimeter:  string | boolean;
  dateTimeFormat:  string;
  dateFormat:  string;
  events:  string;
  minimumValue:  string;
  maximumValue:  string;
  fldDisabledCondition:  string ;
  active:  string | boolean;
  inputPropsArray: Array<any>;
}
