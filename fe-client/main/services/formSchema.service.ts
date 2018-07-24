import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FeFormSchemaService {

  private _schema = {
    101: {
      "id": "FRM0000001",
      "code": "FRM0000001",
      "formLabel": "Form Label Would be here.",
      "name": "sfsadfasdf",
      "type": "conventional",
      "disabled": false,
      "hidden": false,
      "showCondition": {
        "simple": {
          "show": false,
          "when": "text-field-grh",
          "value": 'rathor',
          "operator": '=='
        }/* ,
        "advanced": [
          "var show; return show = controls.number2.value == 100 ? true : false;",
          "var show1; return show1 = controls.nuumber3.value == 200 ? true : false;"
        ],
        "json": {
          "showCondition": {
            "and": [
              {
                "===": [
                  {
                    "var": "username.value"
                  },
                  "harishrathor"
                ]
              },
              {
                "===": [
                  {
                    "var": "number.value"
                  },
                  169
                ]
              }
            ]
          },
          "condition1": {
            "and": [
              {
                "===": [
                  {
                    "var": "first_name.value"
                  },
                  "harish"
                ]
              },
              {
                "===": [
                  {
                    "var": "username.value"
                  },
                  "harishrathor"
                ]
              }
            ]
          }
        } */
      },
      "disableCondition": {
        "simple": {
          "disable": true,
          "when": "text-field-grh",
          "value": 'harish',
          "operator": '=='
        }
      },
      "active": true,
      "help": "<ul><li>Help 1</li><li>Help 2</li></ul>",
      "components": [

        {
          "type": "CHK",
          "inputPropsArray": [
            {
              "label": "Checkbox",
              "value": "1"
            },
            {
              "label": "Checkbox 1",
              "value": "2"
            },
            {
              "label": "Checkbox 3",
              "value": "3"
            }
          ],
          "hasParent": false,
          "label": "Checkbox",
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
          "flexiLabel": "checkbox-a",
          "prefix": "",
          "suffix": "",
          "appliedValidations": [],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_llmattdqg",
          "order": 1,
          "parent": "root_drop",
          "componentName": "CheckboxComponent"
        },
        {
          "type": "PWD",
          "hasParent": false,
          "label": "Password",
          "hideLabel": false,
          "labelPosition": "right",
          "tooltip": "Tooltip",
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
          "flexiLabel": "password-field",
          "prefix": "",
          "suffix": "",
          "appliedValidations": [],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_5zsk34wj8",
          "order": 0,
          "parent": "root_drop",
          "componentName": "PasswordComponent"
        },
        {
          "useDelimeter": true,
          "requiredDecimal": true,
          "type": "NUM",
          "hasParent": false,
          "label": "Number Field",
          "hideLabel": false,
          "labelPosition": "left",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "number-field-asdfsadf",
          "prefix": "prefix",
          "suffix": "",
          "appliedValidations": ['number_positive', 'required'],
          "customFuncValidation": {
            "yearlimit": {
              "validatorFn": " if (control.value  && (isNaN(control.value) || control.value < 2010)) { return { 'yearlimit': true }; } return null; ",
              "message": "Year should be greater than 2010"
            },
            "agelimit": {
              "validatorFn": "if (control.value !== undefined && (isNaN(control.value) || control.value < 50)) { return { 'agelimit': true }; } return null; ",
              "message": "Age should be greater than 50"
            }
          },
          "jsonLogicVal": {
            "json": {
              "and": [
                {
                  "===": [
                    {
                      "var": "username.value"
                    },
                    "cool"
                  ]
                },
                {
                  "===": [
                    {
                      "var": "number123.value"
                    },
                    155
                  ]
                }
              ]
            },
            "message": "JSON Error Message Message."
          },
          "formClassValidation": "",
          "minimumLength": 10,
          "maximumLength": 20,
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_7zc8dmwfp",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "type": "TXT",
          "flexiLabel": 'some-field',
          "hasParent": false,
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "prefix": "",
          "suffix": "suffix",
          "appliedValidations": [],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "label": "Some Text field",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_4mu5p44pa",
          "order": 1,
          "parent": "root_drop",
          "componentName": "TextComponent"
        },
        {
          "enableCk": true,
          "ckSettings": "",
          "spellCheck": true,
          "rows": 5,
          "type": "TXA",
          "hasParent": false,
          "label": "Text Area label",
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
          "flexiLabel": "flexiLabel-tdadf",
          "prefix": "",
          "suffix": "",
          "appliedValidations": [
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_g7ncriov4",
          "order": 2,
          "parent": "root_drop",
          "componentName": "TextAreaComponent"
        },
        {
          "type": "TXT",
          "label": "Text FieldLabel",
          "hideLabel": false,
          "labelPosition": "top",
          "tooltip": "This is tooltip",
          "marginTop": "10px",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValue": "This is default value",
          "nonPersistent": true,
          "dbColumn": "Db -field",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "text-field-grh",
          "prefix": "@",
          "suffix": "",
          "appliedValidations": [
            "required", "alphabet"
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "minimumLength": 10,
          "maximumLength": 24,
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": true,
          "labelWidth": "",
          "labelMargin": "10px",
          "width": "",
          "mask": [],
          "description": "This is description of the field",
          "icon": "",
          "key": "_4lv8at4iu",
          "order": 0,
          "parent": "root_drop",
          "componentName": "TextComponent"
        },
        {
          "type": "TXT",
          "label": " Contru",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          description: `We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else.`,
          "defaultValue": "Default value",
          /* "defaultValueType": "none",
          "defaultValueSqlQuery": "",
          "defaultValueString": "", */
          appliedValidations: ['required', 'alphanumeric'],
          validations: {},
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "first_name",
          "prefix": "",
          "suffix": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": true,
          "labelWidth": "",
          "labelMargin": "",
          "width": "50%",
          "mask": [],
          "icon": "",
          "key": "_xhawl6mlx",
          "order": 0,
          "parent": "root_drop",
          "componentName": "TextComponent"
        },
        {
          "type": "TXT",
          "label": "User Name",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          description: `We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else.`,
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          validations: {},
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
          appliedValidations: ['required', 'email'],
          "flexiLabel": "username",
          "prefix": "",
          "suffix": "",
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": true,
          "labelWidth": "",
          "labelMargin": "",
          "width": "50%",
          "mask": [],
          "icon": "",
          "key": "_xhawl6mlx",
          "order": 0,
          "parent": "root_drop",
          "componentName": "TextComponent"
        },
        {
          "type": "DAT",
          "label": "Date",
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
          appliedValidations: ['required'],
          "flexiLabel": "dob",
          "prefix": "",
          "suffix": "",
          description: `We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else. We'll never share your email with anyone else.`,
          "validations": {},
          minimumDate: '01-Jan-2012',
          maximumDate: '01-Jan-2024',
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": true,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "icon": "",
          "key": "_xhawl6mlx",
          "order": 0,
          "parent": "root_drop",
          "componentName": "TextComponent"
        },
        {
          "type": "TXT",
          "label": "Last Name",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          appliedValidations: ['required', 'email', 'commaseperatedemail'],
          "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "fasdfsdfsfsdf",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "fsdfsdf",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "last_name",
          "prefix": "",
          "suffix": "",
          "validations": {

            minLength: {
              'value': 8,
              'message': 'Minimum length should be XXLENGTHXX'
            },
            maxLength: {
              'value': 19,
              'message': 'Minimum length should be XXLENGTHXX'
            }
          },
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": {//{valName:'Message'}
            customPattern: {
              message: 'Custom pattern is not correct.',
              validatorFuncName: 'asyncCustomPatternValidator'
            }
          },
          "events": {
            "change": {
              "handlerOwner": "form",
              "handlerName": "onUserNameChanged",
              "args": "'arg one','arg2' ,'arg 3'"
            },
            "focus": {
              "handlerOwner": "resource",
              "handlerName": "onUserNameFocus",
              "args": "'arg one','arg2' ,'arg 3'"
            }
          },
          "showCondition": "", /* {
            "simple": {
              "show": false,
              "when": "number1",
              "value": 15,
              "operator": '<='
            },
            "advanced": [
              "var show; return show = controls.number2.value == 100 ? true : false;",
              "var show1; return show1 = controls.nuumber3.value == 200 ? true : false;"
            ],
            "json": {
              "showCondition": {
                "and": [
                  {
                    "===": [
                      {
                        "var": "username.value"
                      },
                      "harishrathor"
                    ]
                  },
                  {
                    "===": [
                      {
                        "var": "number.value"
                      },
                      169
                    ]
                  }
                ]
              },
              "condition1": {
                "and": [
                  {
                    "===": [
                      {
                        "var": "first_name.value"
                      },
                      "harish"
                    ]
                  },
                  {
                    "===": [
                      {
                        "var": "username.value"
                      },
                      "harishrathor"
                    ]
                  }
                ]
              }
            }
          } ,*/
          "disableCondition": {
            "simple": {
              "disable": true,
              "when": "number1",
              "value": 15,
              "operator": '<='
            },
            "advanced": [
              "var show; return show = controls.number2.value == 100 ? true : false;",
              "var show1; return show1 = controls.nuumber3.value == 200 ? true : false;"
            ],
            "json": {
              "showCondition": {
                "and": [
                  {
                    "===": [
                      {
                        "var": "username.value"
                      },
                      "harishrathor"
                    ]
                  },
                  {
                    "===": [
                      {
                        "var": "number.value"
                      },
                      169
                    ]
                  }
                ]
              },
              "condition1": {
                "and": [
                  {
                    "===": [
                      {
                        "var": "first_name.value"
                      },
                      "harish"
                    ]
                  },
                  {
                    "===": [
                      {
                        "var": "username.value"
                      },
                      "harishrathor"
                    ]
                  }
                ]
              }
            }
          },
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "50%",
          "mask": [],
          "icon": "",
          "key": "_9hj8j94zh",
          "order": 0,
          "parent": "root_drop",
          "componentName": "TextComponent"
        },
        {
          "minimumValue": 100,
          "maximumValue": 200,
          "useDelimeter": true,
          "requiredDecimal": true,
          "type": "NUM",
          "label": "Number field",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "123",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "adas",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "number123",
          "prefix": "",
          "suffix": "",
          "appliedValidations": ['required'],
          "validations": {},
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "50%",
          "mask": [],
          "description": "",
          "icon": "",
          "key": "_rl3o427ke",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "minimumValue": 100,
          "maximumValue": 200,
          "useDelimeter": true,
          "requiredDecimal": true,
          "type": "NUM",
          "label": "Number 1",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          /* "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "123", */
          "defaultValue": '',
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "adas",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "number1",
          "prefix": "",
          "suffix": "",
          "validations": {},
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          appliedValidations: ['required'],
          "description": "",
          "icon": "",
          "key": "_rl3o427ke",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "minimumValue": '',
          "maximumValue": '',
          "useDelimeter": true,
          "requiredDecimal": true,
          "type": "NUM",
          appliedValidations: ['number_positive'],
          "label": "Number 2",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          /* "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "123", */
          "defaultValue": '',
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "adas",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "number2",
          "prefix": "",
          "suffix": "",
          "validations": {},
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "key": "_rl3o427ke",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "minimumValue": '',
          "maximumValue": '',
          "useDelimeter": true,
          "requiredDecimal": true,
          "type": "NUM",
          "appliedValidations": ['number_negative'],
          "label": "Number 3",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "123",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "adas",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "number3",
          "prefix": "",
          "suffix": "",
          "validations": {},
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "key": "_rl3o427ke",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "type": "TXT",
          "label": "Single Email",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "123",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "adas",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "email",
          "prefix": "",
          "suffix": "",
          appliedValidations: ['email'],
          "validations": {},
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "key": "_rl3o427ke",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "type": "EML",
          "label": "Multiple Email",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValueType": "string",
          "defaultValueSqlQuery": "",
          "defaultValueString": "123",
          "lovType": "none",
          "lovSqlQuery": "",
          "lovJson": "",
          "nonPersistent": true,
          "dbColumn": "adas",
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "commaseperatedemail",
          "prefix": "",
          "suffix": "",
          appliedValidations: ['commaseperatedemail'],
          "validations": {},
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "key": "_rl3o427ke",
          "order": 0,
          "parent": "root_drop",
          "componentName": "NumberComponent"
        },
        {
          "type": "RAD",
          "inputPropsArray": [
            {
              "label": "Radio 1",
              "value": "1"
            },
            {
              "label": "Radio 2",
              "value": "2"
            },
            {
              "label": "Radio 3",
              "value": "3"
            }
          ],
          "hasParent": false,
          "label": "Radio Field Box",
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
          "flexiLabel": "radio-fld",
          "prefix": "",
          "suffix": "",
          "appliedValidations": [
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
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
          "key": "_6ify8d264",
          "order": 2,
          "parent": "root_drop",
          "componentName": "RadioComponent"
        },
        {
          "type": "SEL",
          "hasParent": false,
          "label": "Select Field",
          "hideLabel": false,
          "labelPosition": "top",
          "marginTop": "",
          "marginRight": "",
          "marginLeft": "",
          "marginBottom": "",
          "defaultValue": "IND",
          "lov": [
            {
              "code": "IND",
              "meaning": "India",
              "tip": "India"
            },
            {
              "code": "USA",
              "meaning": "USA",
              "tip": "USA"
            }
          ],
          "nonPersistent": false,
          "hidden": false,
          "clearWhenHidden": false,
          "disabled": false,
          "flexiLabel": "select-field",
          "prefix": "",
          "suffix": "",
          "isParent": true,
          "appliedValidations": [
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
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
          "key": "_dvcy9ovxo",
          "order": 3,
          "parent": "root_drop",
          "componentName": "SelectComponent"
        },
        {
          "label": "Fieldset",
          "description": "",
          "hideLabel": false,
          "labelPosition": "top",
          "flexiLabel": "flexiLabel-fst",
          "active": true,
          "components": [
            {
              "type": "ANC",
              "hasParent": false,
              "label": "Go to Google",
              "hideLabel": true,
              "labelPosition": "top",
              "marginTop": "",
              "marginRight": "",
              "marginLeft": "",
              "marginBottom": "",
              "defaultValueType": "string",
              "defaultValueSqlQuery": "",
              "defaultValue": "http://www.google.com",
              "lovType": "none",
              "lovSqlQuery": "",
              "lovJson": "",
              "nonPersistent": false,
              "hidden": false,
              "clearWhenHidden": false,
              "disabled": false,
              "flexiLabel": "anchor-fiedl",
              "prefix": "",
              "suffix": "",
              "appliedValidations": [
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_k7t3pqfqc",
              "order": 0,
              "parent": "_s06lm333h",
              "componentName": "AnchorComponent"
            },
            {
              "flexiLabel": "blank",
              "label": "Blank",
              "type": "BLK",
              "key": "_bvflvuggh",
              "order": 1,
              "parent": "_s06lm333h",
              "componentName": "BlankComponent",
              "appliedValidations": [
              ]
            },
            {
              "minimumDate": "",
              "maximumDate": "",
              "dateTimeFormat": "",
              "dateFormat": "",
              "type": "DAT",
              "hasParent": false,
              "label": "Date Field",
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
              "flexiLabel": "date-field",
              "prefix": "",
              "suffix": "",
              "appliedValidations": [],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_equptz4y3",
              "order": 2,
              "parent": "_s06lm333h",
              "componentName": "DateComponent"
            }
          ],
          "type": "FST",
          "width": "100%",
          "hidden": false,
          "key": "_s06lm333h",
          "order": 4,
          "parent": "root_drop",
          "componentName": "FieldSetComponent"
        },
        {
          "label": "Fieldset",
          "description": "",
          "hideLabel": false,
          "labelPosition": "top",
          "flexiLabel": "",
          "active": true,
          "components": [
            {
              "flexiLabel": "blank-field",
              "label": "Blanck",
              "type": "BLK",
              "width": "50%",
              "key": "_u3gqmqhbb",
              "order": 0,
              "parent": "_am4bbscaf",
              "componentName": "BlankComponent",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ]
            },
            {
              "hasParent": false,
              "label": "Facebook",
              "hideLabel": true,
              "labelPosition": "top",
              "marginTop": "",
              "marginRight": "",
              "marginLeft": "",
              "marginBottom": "",
              "defaultValueType": "string",
              "defaultValueSqlQuery": "",
              "defaultValueString": "http://www.facebook.com",
              "lovType": "none",
              "lovSqlQuery": "",
              "lovJson": "",
              "nonPersistent": false,
              "hidden": false,
              "clearWhenHidden": false,
              "disabled": false,
              "flexiLabel": "facebook",
              "prefix": "",
              "suffix": "",
              "appliedValidations": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
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
              "type": "ANC",
              "key": "_76qqai7d8",
              "order": 1,
              "parent": "_am4bbscaf",
              "componentName": "AnchorComponent"
            },
            {
              "type": "MON",
              "hasParent": false,
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
              "prefix": "",
              "suffix": "",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_etz7oewkv",
              "order": 2,
              "parent": "_am4bbscaf",
              "componentName": "MonthComponent"
            },
            {
              "type": "PHN",
              "hasParent": false,
              "label": "Phone Field",
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
              "flexiLabel": "phone-field",
              "prefix": "",
              "suffix": "",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "50%",
              "mask": ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_ma15zjdt3",
              "order": 3,
              "parent": "_am4bbscaf",
              "componentName": "PhoneComponent"
            },
            {
              "type": "ADR",
              "allowMultipleAddress": false,
              "hasParent": false,
              "label": "Address Field",
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
              "flexiLabel": "address-field",
              "prefix": "",
              "suffix": "",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
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
              "key": "_j2kbwk3z0",
              "order": 4,
              "parent": "_am4bbscaf",
              "componentName": "AddressComponent"
            },
            {
              "label": "Fieldset",
              "description": "",
              "hideLabel": false,
              "labelPosition": "top",
              "flexiLabel": "",
              "active": true,
              "components": [
                {
                  "type": "TXT",
                  "hasParent": false,
                  "label": "Text Field ",
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
                  "flexiLabel": "fst-text",
                  "prefix": "",
                  "suffix": "",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ],
                  "customFuncValidation": "",
                  "jsonLogicVal": "",
                  "formClassValidation": "",
                  "events": "",
                  "showCondition": "",
                  "disableCondition": "",
                  "active": true,
                  "required": false,
                  "labelWidth": "",
                  "labelMargin": "",
                  "width": "",
                  "mask": [],
                  "description": "",
                  "icon": "",
                  "parentName": "",
                  "filterSqlQuery": "",
                  "key": "_tncawjjai",
                  "order": 0,
                  "parent": "_pdripm1kc",
                  "componentName": "TextComponent"
                },
                {
                  "label": "Fieldset",
                  "description": "",
                  "hideLabel": true,
                  "labelPosition": "top",
                  "flexiLabel": "nested-fieldset-fst",
                  "active": true,
                  "components": [
                    {
                      "ckSettings": "",
                      "enableSpellCheck": true,
                      "rows": 5,
                      "type": "HTML",
                      "hasParent": false,
                      "label": "HTML Field",
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
                      "flexiLabel": "html-field",
                      "prefix": "",
                      "suffix": "",
                      "appliedValidations": '', "appliedValidations1": [
                        {
                          "id": "required",
                          "text": "Required"
                        },
                        {
                          "id": "number_positive",
                          "text": "Number Positive"
                        },
                        {
                          "id": "number_negative",
                          "text": "Number Negative"
                        },
                        {
                          "id": "email",
                          "text": "Email"
                        },
                        {
                          "id": "commaseperatedemail",
                          "text": "Multiple Email"
                        },
                        {
                          "id": "alphabet",
                          "text": "Alphabet"
                        },
                        {
                          "id": "alphanum",
                          "text": "Alphanumeric"
                        }
                      ],
                      "customFuncValidation": "",
                      "jsonLogicVal": "",
                      "formClassValidation": "",
                      "events": "",
                      "showCondition": "",
                      "disableCondition": "",
                      "active": true,
                      "required": false,
                      "labelWidth": "",
                      "labelMargin": "",
                      "width": "",
                      "mask": [],
                      "description": "",
                      "icon": "",
                      "parentName": "",
                      "filterSqlQuery": "",
                      "key": "_uvfxhqncd",
                      "order": 0,
                      "parent": "_pvdrdjoy8",
                      "componentName": "HTMLComponent"
                    },
                    {
                      "type": "ACS",
                      "hasParent": false,
                      "label": "Autocoomplete Field ",
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
                      "flexiLabel": "autocomplete-field",
                      "prefix": "",
                      "suffix": "",
                      "appliedValidations": '', "appliedValidations1": [
                        {
                          "id": "required",
                          "text": "Required"
                        },
                        {
                          "id": "number_positive",
                          "text": "Number Positive"
                        },
                        {
                          "id": "number_negative",
                          "text": "Number Negative"
                        },
                        {
                          "id": "email",
                          "text": "Email"
                        },
                        {
                          "id": "commaseperatedemail",
                          "text": "Multiple Email"
                        },
                        {
                          "id": "alphabet",
                          "text": "Alphabet"
                        },
                        {
                          "id": "alphanum",
                          "text": "Alphanumeric"
                        }
                      ],
                      "customFuncValidation": "",
                      "jsonLogicVal": "",
                      "formClassValidation": "",
                      "events": "",
                      "showCondition": "",
                      "disableCondition": "",
                      "active": true,
                      "required": false,
                      "labelWidth": "",
                      "labelMargin": "",
                      "width": "",
                      "mask": [],
                      "description": "",
                      "icon": "",
                      "parentName": "",
                      "filterSqlQuery": "",
                      "key": "_czkzmzm7t",
                      "order": 1,
                      "parent": "_pvdrdjoy8",
                      "componentName": "AutoCompleteComponent"
                    }
                  ],
                  "type": "FST",
                  "width": "100%",
                  "hidden": false,
                  "key": "_pvdrdjoy8",
                  "order": 1,
                  "parent": "_pdripm1kc",
                  "componentName": "FieldSetComponent",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ]
                }
              ],
              "type": "FST",
              "width": "100%",
              "hidden": false,
              "key": "_pdripm1kc",
              "order": 5,
              "parent": "_am4bbscaf",
              "componentName": "FieldSetComponent"
            },
            {
              "type": "PHN",
              "hasParent": false,
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
              "prefix": "",
              "suffix": "",
              "appliedValidations": "",
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_yf14lm4oa",
              "order": 3,
              "parent": "_am4bbscaf",
              "componentName": "PhoneComponent"
            }
          ],
          "type": "FST",
          "width": "100%",
          "hidden": false,
          "key": "_am4bbscaf",
          "order": 0,
          "parent": "root_drop",
          "componentName": "FieldSetComponent"
        },
        {
          "hasParent": false,
          "label": "File",
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
          "flexiLabel": "file-fi",
          "prefix": "",
          "suffix": "",
          "appliedValidations": '', "appliedValidations1": [
            {
              "id": "required",
              "text": "Required"
            },
            {
              "id": "number_positive",
              "text": "Number Positive"
            },
            {
              "id": "number_negative",
              "text": "Number Negative"
            },
            {
              "id": "email",
              "text": "Email"
            },
            {
              "id": "commaseperatedemail",
              "text": "Multiple Email"
            },
            {
              "id": "alphabet",
              "text": "Alphabet"
            },
            {
              "id": "alphanum",
              "text": "Alphanumeric"
            }
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
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
          "fileMinimumSize": "",
          "fileMaximumSize": "",
          "type": "FILE",
          "key": "_rj53o6ev6",
          "order": 1,
          "parent": "root_drop",
          "componentName": "FileComponent"
        },
        {
          "type": "EML",
          "hasParent": false,
          "label": "Email Field Label",
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
          "flexiLabel": "email-field",
          "prefix": "",
          "suffix": "",
          "appliedValidations": '', "appliedValidations1": [
            {
              "id": "required",
              "text": "Required"
            },
            {
              "id": "number_positive",
              "text": "Number Positive"
            },
            {
              "id": "number_negative",
              "text": "Number Negative"
            },
            {
              "id": "email",
              "text": "Email"
            },
            {
              "id": "commaseperatedemail",
              "text": "Multiple Email"
            },
            {
              "id": "alphabet",
              "text": "Alphabet"
            },
            {
              "id": "alphanum",
              "text": "Alphanumeric"
            }
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
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
          "key": "_i1yaqj3xj",
          "order": 2,
          "parent": "root_drop",
          "componentName": "EmailComponent"
        },
        {
          "type": "TXT",
          "hasParent": false,
          "label": "Currency Field",
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
          "flexiLabel": "currency-field",
          "prefix": "",
          "suffix": "",
          "appliedValidations": '', "appliedValidations1": [
            {
              "id": "required",
              "text": "Required"
            },
            {
              "id": "number_positive",
              "text": "Number Positive"
            },
            {
              "id": "number_negative",
              "text": "Number Negative"
            },
            {
              "id": "email",
              "text": "Email"
            },
            {
              "id": "commaseperatedemail",
              "text": "Multiple Email"
            },
            {
              "id": "alphabet",
              "text": "Alphabet"
            },
            {
              "id": "alphanum",
              "text": "Alphanumeric"
            }
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_k86mgl1nm",
          "order": 3,
          "parent": "root_drop",
          "componentName": "CurrencyComponent"
        },
        {
          "type": "MSL",
          "hasParent": false,
          "label": "Multiselect Field",
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
          "flexiLabel": "msl-field",
          "prefix": "",
          "suffix": "",
          "appliedValidations": '', "appliedValidations1": [
            {
              "id": "required",
              "text": "Required"
            },
            {
              "id": "number_positive",
              "text": "Number Positive"
            },
            {
              "id": "number_negative",
              "text": "Number Negative"
            },
            {
              "id": "email",
              "text": "Email"
            },
            {
              "id": "commaseperatedemail",
              "text": "Multiple Email"
            },
            {
              "id": "alphabet",
              "text": "Alphabet"
            },
            {
              "id": "alphanum",
              "text": "Alphanumeric"
            }
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_0r7vmo8qz",
          "order": 0,
          "parent": "root_drop",
          "componentName": "MultiSelectComponent"
        },
        {
          "type": "TXT",
          "hasParent": false,
          "label": "Currency Field",
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
          "flexiLabel": "currency-field-yui",
          "prefix": "$",
          "suffix": "",
          "appliedValidations": '', "appliedValidations1": [
            {
              "id": "required",
              "text": "Required"
            },
            {
              "id": "number_positive",
              "text": "Number Positive"
            },
            {
              "id": "number_negative",
              "text": "Number Negative"
            },
            {
              "id": "email",
              "text": "Email"
            },
            {
              "id": "commaseperatedemail",
              "text": "Multiple Email"
            },
            {
              "id": "alphabet",
              "text": "Alphabet"
            },
            {
              "id": "alphanum",
              "text": "Alphanumeric"
            }
          ],
          "customFuncValidation": "",
          "jsonLogicVal": "",
          "formClassValidation": "",
          "events": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "parentName": "",
          "filterSqlQuery": "",
          "key": "_tdomql9tk",
          "order": 1,
          "parent": "root_drop",
          "componentName": "CurrencyComponent"
        },
        {
          "label": "Fieldset 1",
          "description": "",
          "hideLabel": false,
          "labelPosition": "top",
          "flexiLabel": "fst-1-nnnn",
          "active": true,
          "components": [
            {
              "label": "Fieldset 2",
              "description": "",
              "hideLabel": false,
              "labelPosition": "top",
              "flexiLabel": "nnn-fst-2",
              "active": true,
              "components": [
                {
                  "label": "Fieldset 3",
                  "description": "",
                  "hideLabel": false,
                  "labelPosition": "top",
                  "flexiLabel": "nnnn-fst",
                  "active": true,
                  "components": [
                    {
                      "label": "Fieldset 4",
                      "description": "",
                      "hideLabel": true,
                      "labelPosition": "top",
                      "flexiLabel": "nnnn-fst-4",
                      "active": true,
                      "components": [
                        {
                          "label": "Fieldset 5",
                          "description": "",
                          "hideLabel": false,
                          "labelPosition": "top",
                          "flexiLabel": "fst-nnnnnnn",
                          "active": true,
                          "components": [
                            {

                              "theme": "primary",
                              "size": "large",
                              "btnLeftIcon": "md-search",
                              "btnRightIcon": "md-person",
                              "hasParent": false,
                              "label": "Button",
                              "hideLabel": false,
                              "labelPosition": "top",
                              tooltip: "This is button tooltip.",
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
                              "flexiLabel": "asdfas",
                              "prefix": "",
                              "suffix": "",
                              appliedValidations: '',
                              "appliedValidations1": [
                                {
                                  "id": "required",
                                  "text": "Required"
                                },
                                {
                                  "id": "number_positive",
                                  "text": "Number Positive"
                                },
                                {
                                  "id": "number_negative",
                                  "text": "Number Negative"
                                },
                                {
                                  "id": "email",
                                  "text": "Email"
                                },
                                {
                                  "id": "commaseperatedemail",
                                  "text": "Multiple Email"
                                },
                                {
                                  "id": "alphabet",
                                  "text": "Alphabet"
                                },
                                {
                                  "id": "alphanum",
                                  "text": "Alphanumeric"
                                }
                              ],
                              "customFuncValidation": "",
                              "jsonLogicVal": "",
                              "formClassValidation": "",
                              "events": "",
                              "showCondition": "",
                              "disableCondition": "",
                              "active": true,
                              "required": false,
                              "labelWidth": "",
                              "labelMargin": "",
                              "width": "",
                              "mask": [],
                              "description": "",
                              "icon": "",
                              "parentName": "",
                              "filterSqlQuery": "",
                              "type": "BTN",
                              "key": "_r1p25ognx",
                              "order": 0,
                              "parent": "_10syvizk9",
                              "componentName": "ButtonComponent"
                            },
                            {
                              "label": "Fieldset 6",
                              "description": "",
                              "hideLabel": false,
                              "labelPosition": "top",
                              "flexiLabel": "nnnn-fst-",
                              "active": true,
                              "components": [
                                {
                                  "theme": "primary",
                                  "size": "small",
                                  "btnLeftIcon": "",
                                  "btnRightIcon": "",
                                  "hasParent": false,
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
                                  "flexiLabel": "iconic-button",
                                  "prefix": "",
                                  "suffix": "",
                                  "appliedValidations": '', "appliedValidations1": [
                                    {
                                      "id": "required",
                                      "text": "Required"
                                    },
                                    {
                                      "id": "number_positive",
                                      "text": "Number Positive"
                                    },
                                    {
                                      "id": "number_negative",
                                      "text": "Number Negative"
                                    },
                                    {
                                      "id": "email",
                                      "text": "Email"
                                    },
                                    {
                                      "id": "commaseperatedemail",
                                      "text": "Multiple Email"
                                    },
                                    {
                                      "id": "alphabet",
                                      "text": "Alphabet"
                                    },
                                    {
                                      "id": "alphanum",
                                      "text": "Alphanumeric"
                                    }
                                  ],
                                  "customFuncValidation": "",
                                  "jsonLogicVal": "",
                                  "formClassValidation": "",
                                  "events": "",
                                  "showCondition": "",
                                  "disableCondition": "",
                                  "active": true,
                                  "required": false,
                                  "labelWidth": "",
                                  "labelMargin": "",
                                  "width": "",
                                  "mask": [],
                                  "description": "",
                                  "icon": "md-save",
                                  "parentName": "",
                                  "filterSqlQuery": "",
                                  "type": "ICB",
                                  "key": "_jcfea6keu",
                                  "order": 0,
                                  "parent": "_r0ck6qu9e",
                                  "componentName": "IcbComponent"
                                },
                                {
                                  "ckSettings": "",
                                  "enableSpellCheck": true,
                                  "rows": 5,
                                  "type": "HTML",
                                  "hasParent": false,
                                  "label": "HTML Editor",
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
                                  "flexiLabel": "html-editor",
                                  "prefix": "",
                                  "suffix": "",
                                  "appliedValidations": '', "appliedValidations1": [
                                    {
                                      "id": "required",
                                      "text": "Required"
                                    },
                                    {
                                      "id": "number_positive",
                                      "text": "Number Positive"
                                    },
                                    {
                                      "id": "number_negative",
                                      "text": "Number Negative"
                                    },
                                    {
                                      "id": "email",
                                      "text": "Email"
                                    },
                                    {
                                      "id": "commaseperatedemail",
                                      "text": "Multiple Email"
                                    },
                                    {
                                      "id": "alphabet",
                                      "text": "Alphabet"
                                    },
                                    {
                                      "id": "alphanum",
                                      "text": "Alphanumeric"
                                    }
                                  ],
                                  "customFuncValidation": "",
                                  "jsonLogicVal": "",
                                  "formClassValidation": "",
                                  "events": "",
                                  "showCondition": "",
                                  "disableCondition": "",
                                  "active": true,
                                  "required": false,
                                  "labelWidth": "",
                                  "labelMargin": "",
                                  "width": "",
                                  "mask": [],
                                  "description": "",
                                  "icon": "",
                                  "parentName": "",
                                  "filterSqlQuery": "",
                                  "key": "_v5h7wu2b7",
                                  "order": 1,
                                  "parent": "_r0ck6qu9e",
                                  "componentName": "HTMLComponent"
                                }
                              ],
                              "type": "FST",
                              "width": "100%",
                              "hidden": false,
                              "key": "_r0ck6qu9e",
                              "order": 0,
                              "parent": "_10syvizk9",
                              "componentName": "FieldSetComponent",
                              "appliedValidations": '', "appliedValidations1": [
                                {
                                  "id": "required",
                                  "text": "Required"
                                },
                                {
                                  "id": "number_positive",
                                  "text": "Number Positive"
                                },
                                {
                                  "id": "number_negative",
                                  "text": "Number Negative"
                                },
                                {
                                  "id": "email",
                                  "text": "Email"
                                },
                                {
                                  "id": "commaseperatedemail",
                                  "text": "Multiple Email"
                                },
                                {
                                  "id": "alphabet",
                                  "text": "Alphabet"
                                },
                                {
                                  "id": "alphanum",
                                  "text": "Alphanumeric"
                                }
                              ]
                            },
                            {
                              "type": "PWD",
                              "hasParent": false,
                              "label": "Password Field",
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
                              "flexiLabel": "password-5",
                              "prefix": "",
                              "suffix": "",
                              "appliedValidations": '', "appliedValidations1": [
                                {
                                  "id": "required",
                                  "text": "Required"
                                },
                                {
                                  "id": "number_positive",
                                  "text": "Number Positive"
                                },
                                {
                                  "id": "number_negative",
                                  "text": "Number Negative"
                                },
                                {
                                  "id": "email",
                                  "text": "Email"
                                },
                                {
                                  "id": "commaseperatedemail",
                                  "text": "Multiple Email"
                                },
                                {
                                  "id": "alphabet",
                                  "text": "Alphabet"
                                },
                                {
                                  "id": "alphanum",
                                  "text": "Alphanumeric"
                                }
                              ],
                              "customFuncValidation": "",
                              "jsonLogicVal": "",
                              "formClassValidation": "",
                              "events": "",
                              "showCondition": "",
                              "disableCondition": "",
                              "active": true,
                              "required": false,
                              "labelWidth": "",
                              "labelMargin": "",
                              "width": "",
                              "mask": [],
                              "description": "",
                              "icon": "",
                              "parentName": "",
                              "filterSqlQuery": "",
                              "key": "_e0tv07qg6",
                              "order": 1,
                              "parent": "_10syvizk9",
                              "componentName": "PasswordComponent"
                            }
                          ],
                          "type": "FST",
                          "width": "100%",
                          "hidden": false,
                          "key": "_10syvizk9",
                          "order": 0,
                          "parent": "_ph3ncmpn9",
                          "componentName": "FieldSetComponent",
                          "appliedValidations": '', "appliedValidations1": [
                            {
                              "id": "required",
                              "text": "Required"
                            },
                            {
                              "id": "number_positive",
                              "text": "Number Positive"
                            },
                            {
                              "id": "number_negative",
                              "text": "Number Negative"
                            },
                            {
                              "id": "email",
                              "text": "Email"
                            },
                            {
                              "id": "commaseperatedemail",
                              "text": "Multiple Email"
                            },
                            {
                              "id": "alphabet",
                              "text": "Alphabet"
                            },
                            {
                              "id": "alphanum",
                              "text": "Alphanumeric"
                            }
                          ]
                        },
                        {
                          "type": "TXT",
                          "hasParent": false,
                          "label": "Text Field 5",
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
                          "flexiLabel": "text-5",
                          "prefix": "",
                          "suffix": "",
                          "appliedValidations": '', "appliedValidations1": [
                            {
                              "id": "required",
                              "text": "Required"
                            },
                            {
                              "id": "number_positive",
                              "text": "Number Positive"
                            },
                            {
                              "id": "number_negative",
                              "text": "Number Negative"
                            },
                            {
                              "id": "email",
                              "text": "Email"
                            },
                            {
                              "id": "commaseperatedemail",
                              "text": "Multiple Email"
                            },
                            {
                              "id": "alphabet",
                              "text": "Alphabet"
                            },
                            {
                              "id": "alphanum",
                              "text": "Alphanumeric"
                            }
                          ],
                          "customFuncValidation": "",
                          "jsonLogicVal": "",
                          "formClassValidation": "",
                          "events": "",
                          "showCondition": "",
                          "disableCondition": "",
                          "active": true,
                          "required": false,
                          "labelWidth": "",
                          "labelMargin": "",
                          "width": "",
                          "mask": [],
                          "description": "",
                          "icon": "",
                          "parentName": "",
                          "filterSqlQuery": "",
                          "key": "_ah7ad34q4",
                          "order": 1,
                          "parent": "_ph3ncmpn9",
                          "componentName": "TextComponent"
                        }
                      ],
                      "type": "FST",
                      "width": "100%",
                      "hidden": false,
                      "key": "_ph3ncmpn9",
                      "order": 0,
                      "parent": "_9wu7jtxec",
                      "componentName": "FieldSetComponent",
                      "appliedValidations": '', "appliedValidations1": [
                        {
                          "id": "required",
                          "text": "Required"
                        },
                        {
                          "id": "number_positive",
                          "text": "Number Positive"
                        },
                        {
                          "id": "number_negative",
                          "text": "Number Negative"
                        },
                        {
                          "id": "email",
                          "text": "Email"
                        },
                        {
                          "id": "commaseperatedemail",
                          "text": "Multiple Email"
                        },
                        {
                          "id": "alphabet",
                          "text": "Alphabet"
                        },
                        {
                          "id": "alphanum",
                          "text": "Alphanumeric"
                        }
                      ]
                    }
                  ],
                  "type": "FST",
                  "width": "100%",
                  "hidden": false,
                  "key": "_9wu7jtxec",
                  "order": 0,
                  "parent": "_klon1bzp6",
                  "componentName": "FieldSetComponent",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ]
                }
              ],
              "type": "FST",
              "width": "100%",
              "hidden": false,
              "key": "_klon1bzp6",
              "order": 0,
              "parent": "_ki9dtq6q1",
              "componentName": "FieldSetComponent",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ]
            }
          ],
          "type": "FST",
          "width": "100%",
          "hidden": false,
          "key": "_ki9dtq6q1",
          "order": 2,
          "parent": "root_drop",
          "componentName": "FieldSetComponent",
          "appliedValidations": '', "appliedValidations1": [
            {
              "id": "required",
              "text": "Required"
            },
            {
              "id": "number_positive",
              "text": "Number Positive"
            },
            {
              "id": "number_negative",
              "text": "Number Negative"
            },
            {
              "id": "email",
              "text": "Email"
            },
            {
              "id": "commaseperatedemail",
              "text": "Multiple Email"
            },
            {
              "id": "alphabet",
              "text": "Alphabet"
            },
            {
              "id": "alphanum",
              "text": "Alphanumeric"
            }
          ]
        },
        {
          "label": "Fieldset",
          "description": "",
          "hideLabel": false,
          "labelPosition": "top",
          "flexiLabel": "",
          "active": true,
          "components": [
            {
              "hasParent": false,
              "label": "File Field",
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
              "flexiLabel": "file-n233",
              "prefix": "",
              "suffix": "",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "fileMinimumSize": "",
              "fileMaximumSize": "",
              "type": "FILE",
              "key": "_r6vd3yozl",
              "order": 0,
              "parent": "_jvs9iq5ee",
              "componentName": "FileComponent"
            },
            {
              "type": "MSL",
              "hasParent": false,
              "label": "Mulstiselect Field",
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
              "flexiLabel": "msl-n1443",
              "prefix": "",
              "suffix": "",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_2gbrdyqvu",
              "order": 1,
              "parent": "_jvs9iq5ee",
              "componentName": "MultiSelectComponent"
            },
            {
              "label": "Fieldset",
              "description": "",
              "hideLabel": false,
              "labelPosition": "top",
              "flexiLabel": "",
              "active": true,
              "components": [
                {
                  "label": "Fieldset 900",
                  "description": "",
                  "hideLabel": false,
                  "labelPosition": "top",
                  "flexiLabel": "sdfsdf",
                  "active": true,
                  "components": [],
                  "type": "FST",
                  "width": "50%",
                  "hidden": false,
                  "key": "_icdnio4qs",
                  "order": 0,
                  "parent": "_f7itnjhwn",
                  "componentName": "FieldSetComponent",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ]
                },
                {
                  "label": "Fieldset 9001",
                  "description": "",
                  "hideLabel": false,
                  "labelPosition": "top",
                  "flexiLabel": "fwerwe",
                  "active": true,
                  "components": [],
                  "type": "FST",
                  "width": "50%",
                  "hidden": false,
                  "key": "_0psew3iek",
                  "order": 1,
                  "parent": "_f7itnjhwn",
                  "componentName": "FieldSetComponent",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ]
                }
              ],
              "type": "FST",
              "width": "100%",
              "hidden": false,
              "key": "_f7itnjhwn",
              "order": 2,
              "parent": "_jvs9iq5ee",
              "componentName": "FieldSetComponent"
            },
            {
              "label": "Fieldset 1000",
              "description": "",
              "hideLabel": false,
              "labelPosition": "top",
              "flexiLabel": "fasdfsdfs",
              "active": true,
              "components": [
                {
                  "label": "Fieldset",
                  "description": "",
                  "hideLabel": false,
                  "labelPosition": "top",
                  "flexiLabel": "",
                  "active": true,
                  "components": [
                    {
                      "type": "ADR",
                      "allowMultipleAddress": false,
                      "hasParent": false,
                      "label": "Address Field",
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
                      "flexiLabel": "address-n1000",
                      "prefix": "",
                      "suffix": "",
                      "appliedValidations": '', "appliedValidations1": [
                        {
                          "id": "required",
                          "text": "Required"
                        },
                        {
                          "id": "number_positive",
                          "text": "Number Positive"
                        },
                        {
                          "id": "number_negative",
                          "text": "Number Negative"
                        },
                        {
                          "id": "email",
                          "text": "Email"
                        },
                        {
                          "id": "commaseperatedemail",
                          "text": "Multiple Email"
                        },
                        {
                          "id": "alphabet",
                          "text": "Alphabet"
                        },
                        {
                          "id": "alphanum",
                          "text": "Alphanumeric"
                        }
                      ],
                      "customFuncValidation": "",
                      "jsonLogicVal": "",
                      "formClassValidation": "",
                      "events": "",
                      "showCondition": "",
                      "disableCondition": "",
                      "active": true,
                      "required": false,
                      "labelWidth": "",
                      "labelMargin": "",
                      "width": "",
                      "mask": [],
                      "description": "",
                      "icon": "",
                      "parentName": "",
                      "filterSqlQuery": "",
                      "key": "_o7o4y5dpu",
                      "order": 0,
                      "parent": "_t703m7hqt",
                      "componentName": "AddressComponent"
                    }
                  ],
                  "type": "FST",
                  "width": "100%",
                  "hidden": false,
                  "key": "_t703m7hqt",
                  "order": 0,
                  "parent": "_w3n8aky06",
                  "componentName": "FieldSetComponent"
                }
              ],
              "type": "FST",
              "width": "100%",
              "hidden": false,
              "key": "_w3n8aky06",
              "order": 3,
              "parent": "_jvs9iq5ee",
              "componentName": "FieldSetComponent",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ]
            },
            {
              "label": "Fieldset 1100",
              "description": "",
              "hideLabel": false,
              "labelPosition": "top",
              "flexiLabel": "asdfasd",
              "active": true,
              "components": [
                {
                  "type": "ACS",
                  "hasParent": false,
                  "label": "ACS FIELD",
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
                  "flexiLabel": "acs-n1000",
                  "prefix": "",
                  "suffix": "",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ],
                  "customFuncValidation": "",
                  "jsonLogicVal": "",
                  "formClassValidation": "",
                  "events": "",
                  "showCondition": "",
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
                  "key": "_7s8e0k109",
                  "order": 0,
                  "parent": "_ip47ckiyk",
                  "componentName": "AutoCompleteComponent"
                },
                {
                  "type": "TIM",
                  "hasParent": false,
                  "label": "Time Field",
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
                  "flexiLabel": "time-n11000",
                  "prefix": "",
                  "suffix": "",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ],
                  "customFuncValidation": "",
                  "jsonLogicVal": "",
                  "formClassValidation": "",
                  "events": "",
                  "showCondition": "",
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
                  "key": "_wyccm3dfp",
                  "order": 1,
                  "parent": "_ip47ckiyk",
                  "componentName": "TimeComponent"
                },
                {
                  "type": "TXT",
                  "hasParent": false,
                  "label": "Currency Field",
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
                  "flexiLabel": "currency-noiuo",
                  "prefix": "",
                  "suffix": "",
                  "appliedValidations": '', "appliedValidations1": [
                    {
                      "id": "required",
                      "text": "Required"
                    },
                    {
                      "id": "number_positive",
                      "text": "Number Positive"
                    },
                    {
                      "id": "number_negative",
                      "text": "Number Negative"
                    },
                    {
                      "id": "email",
                      "text": "Email"
                    },
                    {
                      "id": "commaseperatedemail",
                      "text": "Multiple Email"
                    },
                    {
                      "id": "alphabet",
                      "text": "Alphabet"
                    },
                    {
                      "id": "alphanum",
                      "text": "Alphanumeric"
                    }
                  ],
                  "customFuncValidation": "",
                  "jsonLogicVal": "",
                  "formClassValidation": "",
                  "events": "",
                  "showCondition": "",
                  "disableCondition": "",
                  "active": true,
                  "required": false,
                  "labelWidth": "",
                  "labelMargin": "",
                  "width": "",
                  "mask": [],
                  "description": "",
                  "icon": "",
                  "parentName": "",
                  "filterSqlQuery": "",
                  "key": "_jbiufpqri",
                  "order": 2,
                  "parent": "_ip47ckiyk",
                  "componentName": "CurrencyComponent"
                }
              ],
              "type": "FST",
              "width": "100%",
              "hidden": false,
              "key": "_ip47ckiyk",
              "order": 4,
              "parent": "_jvs9iq5ee",
              "componentName": "FieldSetComponent",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ]
            },
            {
              "type": "PHN",
              "hasParent": false,
              "label": "Phone Field",
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
              "flexiLabel": "phone-n1231",
              "prefix": "",
              "suffix": "",
              "appliedValidations": '', "appliedValidations1": [
                {
                  "id": "required",
                  "text": "Required"
                },
                {
                  "id": "number_positive",
                  "text": "Number Positive"
                },
                {
                  "id": "number_negative",
                  "text": "Number Negative"
                },
                {
                  "id": "email",
                  "text": "Email"
                },
                {
                  "id": "commaseperatedemail",
                  "text": "Multiple Email"
                },
                {
                  "id": "alphabet",
                  "text": "Alphabet"
                },
                {
                  "id": "alphanum",
                  "text": "Alphanumeric"
                }
              ],
              "customFuncValidation": "",
              "jsonLogicVal": "",
              "formClassValidation": "",
              "events": "",
              "showCondition": "",
              "disableCondition": "",
              "active": true,
              "required": false,
              "labelWidth": "",
              "labelMargin": "",
              "width": "",
              "mask": [],
              "description": "",
              "icon": "",
              "parentName": "",
              "filterSqlQuery": "",
              "key": "_3ehcmi4b0",
              "order": 5,
              "parent": "_jvs9iq5ee",
              "componentName": "PhoneComponent"
            }
          ],
          "type": "FST",
          "width": "100%",
          "hidden": false,
          "key": "_jvs9iq5ee",
          "order": 3,
          "parent": "root_drop",
          "componentName": "FieldSetComponent"
        }
      ],
      "buttons": [
        {
          "theme": "primary",
          "size": "large",
          "btnLeftIcon": "",
          "btnRightIcon": "",
          "type": "BTN",
          "label": "adad",
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
          "flexiLabel": "dasdasd",
          "prefix": "",
          "suffix": "",
          "validations": "",
          "customFuncValidation": {},
          events: {
            click: {
              handlerOwner: 'form',
              handlerName: 'submitForm',
              args: "'change event','My' ,'Name  ',   'Is','Khan'"
            }
          },
          "formClassValidation": "",
          "showCondition": "",
          "disableCondition": "",
          "active": true,
          "required": false,
          "labelWidth": "",
          "labelMargin": "",
          "width": "",
          "mask": [],
          "description": "",
          "icon": "",
          "key": "_id7kyj8mv",
          "order": 0,
          "parent": "button_drop",
          "componentName": "ButtonComponent"
        },
        {
          id: 'BTN00001',
          label: 'Submit',
          icon: 'md-save',
          events: {
            click: {
              handlerOwner: 'form',
              handlerName: 'submitForm',
              args: "'change event','My' ,'Name  ',   'Is','Khan'"
            }
          }
        },
        {
          id: 'BTN00002',
          label: 'Hover',
          icon: 'md-save',
          events: '',
          submit: true
        },
        {
        "theme": "primary",
        "size": "medium",
        "btnLeftIcon": "md-save",
        "btnRightIcon": "",
        "hasParent": false,
        "label": "sdfsdfsdf",
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
        "flexiLabel": "sfsdf",
        "prefix": "",
        "suffix": "",
        "appliedValidations": "",
        "customFuncValidation": "",
        "jsonLogicVal": "",
        "formClassValidation": "",
        "events": "",
        "showCondition": "",
        "disableCondition": "",
        "active": true,
        "required": false,
        "labelWidth": "",
        "labelMargin": "",
        "width": "",
        "mask": [],
        "description": "",
        "icon": "",
        "parentName": "",
        "filterSqlQuery": "",
        "type": "BTN",
        "key": "_pobs53u45",
        "order": 0,
        "parent": "button_drop",
        "componentName": "ButtonComponent"
        }
      ]
    }
  }
  constructor(public router: Router, public route: ActivatedRoute) { }


  makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
    addProps(components, code) {

      if (components.length !== 0) {
        for (let i in components) {
          const field = components[i];
          field.code = this.makeId();
          field.id = this.makeId();
          if (field.type === 'FST') {
            this.addProps(field.components, code);
          }
        }
      }
  };

  getFormSchema(code) {
    let form = this._schema[code];
    if(!code) {
      form = this._schema[101];
    }
    this.addProps(form.components, code);
    this.addProps(form.buttons, code);
    return form;
  };

  navigateToFormGenerator(id: number) {
    this.router.navigate(['/formGenerator', id]);
  }
}
