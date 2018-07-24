import { Injectable } from "@angular/core";

@Injectable()
export class FeDefaultsService {
  protected _buttonTheme: string = "secondary";
  protected _fieldWidth: string = "100%";
  protected _labelPosition: string = "top";
  protected _buttonSize: string = "small";
  protected _decimalLimit: number = 5;
  protected _integerLimit: number = 10;
  protected _calendarMinDate: string = "01-Jan-2009";
  protected _calendarMaxDate: string = "31-Dec-2025";
  protected _btnTooltipSide: string = "top";
  protected _jsonEditorConfig = {
    mode: "code"
  };

  protected _formBuilderJsonHelp = {
    lovHelp: [
      {
        code: "IND",
        meaning: "India",
        tip: "India"
      },
      {
        code: "USA",
        meaning: "USA",
        tip: "USA"
      }
    ],
    customFuncValidationHelp: {
      yearlimit: {
        validatorFn:
          " if (control.value !== undefined && (isNaN(control.value.year) || control.value.year < 2010)) { return { 'yearlimit': true }; } return null; ",
        message: "Year should be greater than 2010"
      },
      agelimit: {
        validatorFn: `if (control.value !== undefined && (isNaN(control.value) || control.value < 50)) { return { 'agelimit': true }; } return null; `,
        message: "Age should be greater than 50"
      }
    },
    enableCkHelp: {},
    jsonLogicValHelp: {
      json: {
        and: [
          { "===": [{ var: "username.value" }, "cool"] },
          { "===": [{ var: "number.value" }, 155] }
        ]
      },
      condition2: "Error Message."
    },
    formClassValidationValHelp: {
      //{valName:'Message'}
      customPattern: {
        message: "Custom pattern is not correct.",
        validatorFuncName: "asyncCustomPatternValidator"
      },
      someOtherValidationName: {
        message: "Error Message",
        validatorFuncName: "formClassFunctionName"
      }
    },
    eventsHelp: {
      change: {
        handlerOwner: "form",
        handlerName: "",
        args: "'arg one','arg2' ,'arg 3'"
      },
      focus: {
        handlerOwner: "resource",
        handlerName: "onUserNameFocus",
        args: "'arg one','arg2' ,'arg 3'"
      }
    },
    conditionHelp: {
      simple: {
        show: true,
        when: "field-flexilabel",
        value: "rathor",
        operator: "=="
      },
      advanced: [
        "var show; return show = controls.number.value == 150 ? true : false;",
        "var show1; return show1 = controls.otherControl.value == 150 ? true : false;"
      ],
      json: {
        showCondition: {
          and: [
            { "===": [{ var: "username.value" }, "apple"] },
            { "===": [{ var: "number.value" }, 15] }
          ]
        },
        condition1: {
          and: [
            { "===": [{ var: "someControl.value" }, "someValue"] },
            { "===": [{ var: "someOtherControl.value" }, "value"] }
          ]
        }
      }
    },
    fldDisabledConditionHelp: {
      simple: {
        disable: true,
        when: "field-flexilabel",
        value: "rathor",
        operator: "=="
      },
      advanced: [
        "var disable; return disable = controls.number.value == 150 ? true : false;",
        "var disable; return disable = controls.otherControl.value == 150 ? true : false;"
      ],
      json: {
        showCondition: {
          and: [
            { "===": [{ var: "username.value" }, "apple"] },
            { "===": [{ var: "number.value" }, 15] }
          ]
        },
        condition1: {
          and: [
            { "===": [{ var: "someControl.value" }, "someValue"] },
            { "===": [{ var: "someOtherControl.value" }, "value"] }
          ]
        }
      }
    }
  };

  public PATTERN = {
    number_positive: /^\d*[1-9]\d*$/,
    number_negative: /^-?\d{2}(\.\d+)?$/,
    alphanumeric: /^[a-z0-9]+$/i,
    alphabet: /^[a-zA-Z_]*$/
  };

  protected _validations: any[] = [
    {
      code: "required",
      meaning: "Required"
    },
    {
      code: "number_positive",
      meaning: "Number Positive"
    },
    {
      code: "number_negative",
      meaning: "Number Negative"
    },
    {
      code: "email",
      meaning: "Email"
    },
    {
      code: "commaseperatedemail",
      meaning: "Multiple Email"
    },
    {
      code: "alphabet",
      meaning: "Alphabet"
    },
    {
      code: "alphanum",
      meaning: "Alphanumeric"
    }
  ];

  protected _buttonThemeClasses = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    success: "btn btn-success",
    danger: "btn btn-danger",
    warning: "btn btn-warning",
    info: "btn btn-info",
    light: "btn btn-light",
    dark: "btn btn-dark",
    link: "btn btn-link",
    "outline-primary": "btn btn-outline-primary",
    "outline-secondary": "btn btn-outline-secondary",
    "outline-success": "btn btn-outline-success",
    "outline-danger": "btn btn-outline-danger",
    "outline-warning": "btn btn-outline-warning",
    "outline-info": "btn btn-outline-info",
    "outline-light": "btn btn-outline-light",
    "outline-dark": "btn btn-outline-dark",
    "primary btn-lg": "btn btn-primary btn-lg",
    "secondary btn-lg": "btn btn-secondary btn-lg",
    "primary btn-sm": "btn btn-primary btn-sm",
    "secondary btn-sm": "btn btn-secondary btn-sm",
    "primary btn-lg btn-block": "btn btn-primary btn-lg btn-block",
    "secondary btn-lg btn-block": "btn btn-secondary btn-lg btn-block",
    "lg btn-primary": "btn btn-lg btn-primary"
  };

  protected _buttonSizeClasses = {
    large: "btn-lg",
    small: "btn-sm",
    medium: "btn-md"
  };

  get BUTTON_THEME() {
    return this._buttonTheme;
  }

  get FIELD_WIDTH() {
    return this._fieldWidth;
  }

  get LABEL_POSITION() {
    return this._labelPosition;
  }

  get BUTTON_THEMES() {
    return this._buttonThemeClasses;
  }

  get BUTTON_SIZES() {
    return this._buttonSizeClasses;
  }

  get BUTTON_SIZE() {
    return this._buttonSize;
  }

  get VALIDATIONS() {
    return this._validations;
  }

  get DECIMAL_LIMIT() {
    return this._decimalLimit;
  }

  get INTEGER_LIMIT() {
    return this._integerLimit;
  }

  get MIN_DATE() {
    return this._calendarMinDate;
  }

  get MAX_DATE() {
    return this._calendarMaxDate;
  }

  get BTN_TOOLTIP_PLACEMENT() {
    return this._btnTooltipSide;
  }

  get JSON_EDITOR_CONFIG() {
    return this._jsonEditorConfig;
  }

  get FORM_BUILDER_JSON_HELP() {
    return this._formBuilderJsonHelp;
  }
}
