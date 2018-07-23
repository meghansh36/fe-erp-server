import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  id?: string,
  hideLabel?: boolean,
  prefix?: string,
  suffix?: string,
  customCssClass: string,
  description?: string;
  code: string;
  flexiLabel: string;
  lov?: any[];
  isParent?: any;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  customFuncValidation?: {
    [key: string]: { name: string, validatorFn: any, message: string }
  };
  jsonLogicVal?: { json: object, message: string },
  validations?: {
    [key: string]: {
      value: any,
      message: string
    }
  };
  formClassValidation?: {
    [key: string]: { message: string, validatorFuncName: string }
  },
  mask?: Array<string>;
  labelPosition?: string,
  labelWidth?: number,//To be checked
  hidden?: boolean,
  labelMargin?: number,
  tabIndex?: string,
  marginTop?: string,
  marginRight?: string,
  marginBottom?: string,
  marginLeft?: string,
  width?: string,
  events: object
  showCondition?: object,
  defaultValue?: any,
  components?: any,
  theme?: string,
  size?: string,
  leftIcon?: string,
  rightIcon?: string,
  ckeditor?: string,
  tooltip?: string,
  icon?: string,
  disableCondition?: any,
  minimumValue?: any,
  maximumValue?: any,
  useDelimeter?: any,
  requiredDecimal?: any,
  required?: any,
  appliedValidations?: any,
  minimumDate?: any,
  maximumDate?: any,
  inputPropsArray?: any,
  submit?: any,
  spellcheck?: any
}

