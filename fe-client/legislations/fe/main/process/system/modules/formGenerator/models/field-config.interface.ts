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
  options?: string[];
  isParent?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  customValidations?: {
    [key: string]: { name: string, validatorFn: any, message: string }
  };
  jsonValidations?: { json: object, message: string },
  validations?: {
    [key: string]: {
      value: any,
      message: string
    }
  };
  formClassValidations?: {
    [key: string]: { message: string, validatorFuncName: string }
  };
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
  condition?: object,
  defaultValue?: any,
  components?: any,
  theme?: string,
  size?: string,
  leftIcon?: string,
  rightIcon?: string,
  ckeditor?: string,
  tooltip?: string,
  show?:any ,
  icon?: string
}

