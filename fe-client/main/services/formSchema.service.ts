import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FeFormSchemaService {

  constructor() { }

  private _schema = {
    id: 'FRM000001',
    name: 'form',
    code: 'FRM000001',
    hideLabel: false,
    label: 'Employee Personal Information',
    condition: {
      type: 'json',
      simple: {
        disabled: true,
        when: 'number',
        eq: 15
      },
      advanced: 'var show; return show = controls.number.value == 155 ? true : false;',
      json: {
        condition: {
          "and": [
            { "===": [{ "var": "username.value" }, 'cool'] },
            { "===": [{ "var": "number.value" }, 155] }
          ]
        }
      }
    },
    components: [
      {
        type: 'TXT',
        code: 'FLD000001',
        flexiLabel: 'username',
        id: 'FRM000001-FLD000001',
        customCssClass: 'custom-css-class1',
        label: 'Username',
        disabled: false,
        prefix: '@',
        defaultValue: 'harish.rathor',
        hidden: false,
        labelMargin: 0,
        tabIndex: '1',
        suffix: 'suff',
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'top',

        labelWidth: 0,//To be checked
        width: '50%',
        placeholder: 'Enter your Username',
        formClassValidations: {//{valName:'Message'}
          customPattern: {
            message: 'Custom pattern is not correct.',
            validatorFuncName: 'asyncCustomPatternValidator'
          }
        },
        events: {
          change: {
            handlerOwner: 'form',
            handlerName: '',
            args: "'change event','My' ,'Name  ',   'Is','Khan'"
          },
          focus: {
            handlerOwner: 'resource',
            handlerName: 'onUserNameFocus',
            args: "'focus event','My' ,'Name  ',   'Is','Khan'"
          }
        },
        validations: {
          required: {
            'value': true,
            'message': 'This Field is required'
          },
          minLength: {
            'value': 8,
            'message': 'Minimum length should be XXLENGTHXX'
          },
          maxLength: {
            'value': 19,
            'message': 'Minimum length should be XXLENGTHXX'
          }
        }
      },
      {
        code: 'FLD000002',
        flexiLabel: 'password',
        id: 'FRM000001-FLD000002',

        //formcontrol: 'password-form',
        type: 'TXT',
        label: 'Password',
        prefix: '#',
        suffix: '&',
        defaultValue: 'harishrathor',
        customCssClass: 'custom-css-class2',
        labelWidth: 0,
        labelPosition: 'top',
        labelMargin: 0,

        description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
        width: '50%',
        placeholder: 'Enter your Password',
        events: {
          input: {
            //event:'input',
            handlerOwner: 'form',
            handlerName: 'onPassWordInput',
            args: "'input','Harish','  Rathor'"
          },
          blur: {
            //event:'blur',
            handlerOwner: 'resource',
            handlerName: 'onPassWordBlur',
            args: "'blur','event', 'Harish'   , 'Rathor'"
          }
        },
        validations: {
          required: {
            'value': true,
            'message': 'This Field is required'
          },
          pattern: {
            'value': '^[a-z0-9_-]{8,15}$',
            'message': 'The Pattern is not correct'
          }
        }
      },
      {
        code: 'FLD000014',
        flexiLabel: 'email',
        id: 'FRM000001-FLD000014',

        //formcontrol: 'email-form',
        type: 'EML',
        label: 'Email',
        prefix: '',
        suffix: '@',
        defaultValue: 'harish.rathor@gmail.com',
        customCssClass: 'custom-css-class2',
        labelWidth: 0,
        labelPosition: 'top',
        labelMargin: 0,

        description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
        width: '33%',
        placeholder: 'Enter your Password',
        validations: {
          required: {
            'value': true,
            'message': 'This Field is required'
          }
        },
        customValidations: {
          commaseperatedemail: {
            name: 'commaseperatedemail',
            validatorFn: function (control: AbstractControl): { [key: string]: boolean } | null {
              let regExp = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4})(,[\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}){0,4}$/;
              if (control.value !== undefined) {
                if (regExp.test(control.value)) {
                  return null;
                }
                else {
                  return { 'commaseperatedemail': true };
                }
              }
            },
            message: 'Email should be correct'
          }
        }
      },
      {
        type: 'NUM',
        code: 'FLD000009',
        flexiLabel: 'number',
        id: 'FRM000001-FLD000009',

        //formcontrol: 'number-form',
        label: 'Number',
        defaultValue: 123,
        labelPosition: 'top',
        width: '33%',
        placeholder: 'Enter your Number',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        },
        customValidations: {
          agelimit: {
            name: 'agelimit',
            validatorFn: function (control: AbstractControl): { [key: string]: boolean } | null { if (control.value !== undefined && (isNaN(control.value) || control.value < 50)) { return { 'agelimit': true }; } return null; },
            message: 'Age should be greater than 50'
          }
        },
        jsonValidations: {
          'json': {
            "if": [
              {
                "==": [
                  { "var": "value" }, 150
                ]
              },
              true,
              false
            ]
          },
          'message': 'Value must be 150'
        }
      },
      {
        type: 'NUM',
        code: 'FLD000020',
        flexiLabel: 'condition',
        id: 'FRM000001-FLD000020',

        //formcontrol: 'number-form',
        label: 'Condition Number',
        width: '33%',
        defaultValue: 1234,
        condition: {
          'type': 'advanced',
          'simple': {
            'show': false,
            'when': 'number',
            'eq': 15
          },
          'advanced': 'var show; return show = controls.number.value == 150 ? true : false;',
          "json": {
            "condition": {
              "and": [
                { "===": [{ "var": "username.value" }, 'apple'] },
                { "===": [{ "var": "number.value" }, 15] }
              ]
            }
          }
        },
        placeholder: 'Enter your Number',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'TXT',
        code: 'FLD000009',
        flexiLabel: 'mask',
        id: 'FRM000001-FLD000019',
        defaultValue: '1234562340',
        //formcontrol: 'mask-form',
        label: 'Mask Input',
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        width: '33%',
        labelPosition: 'top',
        placeholder: '(555) 233 4454',
        validators: [
          {

            'value': true,
            'message': 'This Field is required'
          }
        ]
      },
      {
        type: 'ACS',
        code: 'FLD000008',
        flexiLabel: 'autocomplete',
        id: 'FRM000001-FLD000008',

        //formcontrol: 'auto-form',
        label: 'Country',

        width: '50%',
        placeholder: 'Enter your Country',
        defaultValue: 'Indiana',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'ICB',
        code: 'FLD0401234',
        flexiLabel: 'icb-field',
        id: 'FRM000001-FLD0401234',
        //formcontrol: 'auto-form',
        label: 'ICB',
        icon: 'md-assignment_returned'
      },
      {
        type: 'BLK',
        code: 'FLD0001234',
        flexiLabel: 'blank-field',
        id: 'FRM000001-FLD0001234',
        //formcontrol: 'auto-form',
        label: 'Blank Field',
        width: '50%',
      },
      {
        type: 'HID',
        code: 'FLD0011234',
        flexiLabel: 'hidden-field',
        id: 'FRM000001-FLD0011234',
        //formcontrol: 'auto-form',
        label: 'Hidden Field',
        width: '100%',
        defaultValue: 'Hidden field value'
      },
      {
        type: 'SEL',
        code: 'FLD000023',
        flexiLabel: 'parent',
        label: 'Country',
        defaultValue: 'USA',
        isParent: 'Y',
        placeholder: '--SELECT--',
        options: [{
          'code': 'IND',
          'meaning': 'India',
          'tip': 'India'
        }, {
          'code': 'USA',
          'meaning': 'USA',
          'tip': 'USA'
        }],
        id: 'FRM000001-FLD000023',
        //formcontrol: 'select-form',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'SEL',
        code: 'FLD000023',
        flexiLabel: 'child',
        label: 'States',
        placeholder: '--SELECT--',
        id: 'FRM000001-FLD000023',
        //formcontrol: 'select-form',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        },
      },
      {
        type: 'FIL',
        code: 'FLD000015',
        flexiLabel: 'file',
        label: 'file',
        id: 'FRM000001-FLD000015',
        //formcontrol: 'file-form',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'MSL',
        code: 'FLD000013',
        flexiLabel: 'multi',
        label: 'Multiselect',
        placeholder: '--SELECT--',
        defaultValue: ['male', 'female'],
        options: ['male', 'female', 'others'],
        id: 'FRM000001-FLD000004',
        //formcontrol: 'select-form',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'CHK',
        code: 'FLD000010',
        flexiLabel: 'Checkbox',
        label: 'Checkbox',
        description: "FIeld Description",
        options: ['male', 'female', 'others'],
        id: 'FRM000001-FLD000010',
        defaultValue: 'Y',
        //formcontrol: 'check-form',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'RAD',
        code: 'FLD000011',
        flexiLabel: 'Radio',
        label: 'Radio',
        defaultValue: 'HE',
        options: [
          {
            'code': 'HE',
            'meaning': 'Male',
            'tip': 'Male'
          },
          {
            'code': 'SHE',
            'meaning': 'Female',
            'tip': 'Female'
          },
          {
            'code': 'OTH',
            'meaning': 'Other',
            'tip': 'Other'
          }
        ],
        id: 'FRM000001-FLD000011',
        //formcontrol: 'radio-form',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'ANC',
        code: 'FLD000021',
        flexiLabel: 'Anchor',
        label: 'Anchor',
        defaultValue: 'url',
        value: 'http://google.com',
        id: 'FRM000001-FLD000021',
      },
      {
        type: 'DAT',
        code: 'FLD000004',
        flexiLabel: 'date',
        label: 'Date',
        id: 'FRM000001-FLD000004',
        //formcontrol: 'date-form',
        placeholder: 'yyyy-mm-dd',
        disabled: false,
        hidden: false,
        labelMargin: 20,
        tabIndex: '1',
        suffix: 'suff',
        defaultValue: { year: 2017, month: 2, day: 13 },
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'bottom',

        labelWidth: 0,
        width: '100%',
        customValidations: {
          yearlimit: {
            name: 'yearlimit',
            validatorFn: function (control: AbstractControl): { [key: string]: boolean } | null { if (control.value !== undefined && (isNaN(control.value.year) || control.value.year < 2010)) { return { 'yearlimit': true }; } return null; },
            'message': 'Year should be greater than 2010'
          }
        }
      },
      {
        code: 'FST000001',
        id: 'FRM000001-FST000001',
        type: 'FST',
        flexiLabel: 'fieldset-1',
        label: 'SMS Settings',
        hideLabel: false,
        components: [
          {
            type: 'TXT',
            code: 'FLD000012',
            flexiLabel: 'fst_username',
            id: 'FRM000001-FLD000012',

            //formcontrol: 'fst-username-form',
            customCssClass: 'custom-css-class1',
            label: 'Username',

            disabled: false,
            prefix: '@',
            hidden: false,
            labelMargin: 20,
            tabIndex: '1',
            suffix: 'suff',
            description: 'This is a dummy field. Field description would be here',
            hideLabel: false,
            labelPosition: 'left',

            labelWidth: 0,
            width: '100%',
            placeholder: 'Enter your Username',
            formClassValidations: {
              customPattern: { message: 'Custom pattern is not correct.', validatorFuncName: 'asyncCustomPatternValidator' }
            },
            events: {
              change: {
                //event:'change',
                handlerOwner: 'form',
                handlerName: 'onUserNameChanged',
                args: "'change event','My' ,'Name  ',   'Is','Khan'"
              },
              focus: {
                //event:'focus',
                handlerOwner: 'resource',
                handlerName: 'onUserNameFocus',
                args: "'focus event','My' ,'Name  ',   'Is','Khan'"
              }
            },
            validations: {
              required: {

                'value': true,
                'message': 'This Field is required'
              },
              minLength: {
                'value': 8,
                'message': 'Minimum length should be XXLENGTHXX'
              },
              maxLength: {
                'value': 19,
                'message': 'Minimum length should be XXLENGTHXX'
              }
            }
          },
          {
            code: 'FLD000005',
            flexiLabel: 'fst-assword-1',
            id: 'FRM000001-FLD0000013',

            //formcontrol: 'fst-password-form',
            type: 'TXT',
            label: 'FST Password',
            prefix: '#',
            suffix: '&',
            customCssClass: 'custom-css-class2',
            labelWidth: 0,
            labelPosition: 'left',
            labelMargin: 0,

            description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
            width: '100%',
            placeholder: 'Enter your Password',
            events: {
              input: {
                //event:'input',
                handlerOwner: 'form',
                handlerName: 'onPassWordInput',
                args: "'input','Harish','  Rathor'"
              },
              blur: {
                //event:'blur',
                handlerOwner: 'resource',
                handlerName: 'onPassWordBlur',
                args: "'blur','event', 'Harish'   , 'Rathor'"
              }
            },
            validations: {
              required: {

                'value': true,
                'message': 'This Field is required'
              },
              pattern: {
                'value': '^[a-z0-9_-]{8,15}$',
                'message': 'The Pattern is not correct'
              }
            }
          },
          {
            type: 'TXT',
            code: 'FLD000014',
            flexiLabel: 'fst-username-1',
            id: 'FRM000001-FLD000012',

            //formcontrol: 'fst-username-form-1',
            customCssClass: 'custom-css-class1',
            label: 'Username Fst 1',

            disabled: false,
            prefix: '@',
            hidden: false,
            labelMargin: 20,
            tabIndex: '1',
            suffix: 'suff',
            description: 'This is a dummy field. Field description would be here',
            hideLabel: false,
            labelPosition: 'left',
            labelWidth: 0,
            width: '50%',
            placeholder: 'Enter your Username',
            formClassValidations: {
              customPattern: { message: 'Custom pattern is not correct.', validatorFuncName: 'asyncCustomPatternValidator' }
            },
            events: {
              change: {
                //event:'change',
                handlerOwner: 'form',
                handlerName: 'onUserNameChanged',
                args: "'change event','My' ,'Name  ',   'Is','Khan'"
              },
              focus: {
                //event:'focus',
                handlerOwner: 'resource',
                handlerName: 'onUserNameFocus',
                args: "'focus event','My' ,'Name  ',   'Is','Khan'"
              }
            },
            validations: {
              required: {

                'value': true,
                'message': 'This Field is required'
              },
              minLength: {
                'value': 8,
                'message': 'Minimum length should be XXLENGTHXX'
              },
              maxLength: {
                'value': 19,
                'message': 'Minimum length should be XXLENGTHXX'
              }
            }
          },
          {
            code: 'FLD000002',
            flexiLabel: 'pfst-assword-2',
            id: 'FRM000001-FLD000002',

            //formcontrol: 'fst-password-form-2',
            type: 'TXT',
            label: 'FST Password 2',
            prefix: '#',
            suffix: '&',
            customCssClass: 'custom-css-class2',
            labelWidth: 0,
            labelPosition: 'left',
            labelMargin: 0,

            description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
            width: '50%',
            placeholder: 'Enter your Password',
            events: {
              input: {
                //event:'input',
                handlerOwner: 'form',
                handlerName: 'onPassWordInput',
                args: "'input','Harish','  Rathor'"
              },
              blur: {
                //event:'blur',
                handlerOwner: 'resource',
                handlerName: 'onPassWordBlur',
                args: "'blur','event', 'Harish'   , 'Rathor'"
              }
            },
            validations: {
              required: {

                'value': true,
                'message': 'This Field is required'
              },
              pattern: {
                'value': '^[a-z0-9_-]{8,15}$',
                'message': 'The Pattern is not correct'
              }
            }
          },
          {
            code: 'FST000002',
            flexiLabel: 'dummy-fst-1',
            id: 'FRM000001-FST000002',
            type: 'FST',
            label: 'Mail Settings',
            hideLabel: false,
            components: [
              {
                type: 'TXT',
                code: 'FLD000017',
                flexiLabel: 'fst_username-5',
                id: 'FRM000001-FLD000017',

                //formcontrol: 'fst-username-form-5',
                customCssClass: 'custom-css-class1',
                label: 'Username',

                disabled: false,
                prefix: '@',
                hidden: false,
                labelMargin: 20,
                tabIndex: '1',
                suffix: 'suff',
                description: 'This is a dummy field. Field description would be here',
                hideLabel: false,
                labelPosition: 'left',

                labelWidth: 0,
                width: '50%',
                placeholder: 'Enter your Username',
                formClassValidations: {
                  customPattern: { message: 'Custom pattern is not correct.', validatorFuncName: 'asyncCustomPatternValidator' }
                },
                events: {
                  change: {
                    //event:'change',
                    handlerOwner: 'form',
                    handlerName: 'onUserNameChanged',
                    args: "'change event','My' ,'Name  ',   'Is','Khan'"
                  },
                  focus: {
                    //event:'focus',
                    handlerOwner: 'resource',
                    handlerName: 'onUserNameFocus',
                    args: "'focus event','My' ,'Name  ',   'Is','Khan'"
                  }
                },
                validations: {
                  required: {

                    'value': true,
                    'message': 'This Field is required'
                  },
                  minLength: {

                    'value': 8,
                    'message': 'Minimum length should be XXLENGTHXX'
                  },
                  maxLength: {

                    'value': 19,
                    'message': 'Minimum length should be XXLENGTHXX'
                  }
                }
              },
              {
                code: 'FLD000015',
                flexiLabel: 'fst-assword-1',
                id: 'FRM000001-FLD0000011',

                //formcontrol: 'fst-password-form-5',
                type: 'TXT',
                label: 'FST Password',
                prefix: '#',
                suffix: '&',
                customCssClass: 'custom-css-class2',
                labelWidth: 0,
                labelPosition: 'left',
                labelMargin: 0,

                description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
                width: '50%',
                placeholder: 'Enter your Password',
                events: {
                  input: {
                    //event:'input',
                    handlerOwner: 'form',
                    handlerName: 'onPassWordInput',
                    args: "'input','Harish','  Rathor'"
                  },
                  blur: {
                    //event:'blur',
                    handlerOwner: 'resource',
                    handlerName: 'onPassWordBlur',
                    args: "'blur','event', 'Harish'   , 'Rathor'"
                  }
                },
                validations: {
                  required: {

                    'value': true,
                    'message': 'This Field is required'
                  },
                  pattern: {

                    'value': '^[a-z0-9_-]{8,15}$',
                    'message': 'The Pattern is not correct'
                  }
                }
              },
              {
                type: 'TXT',
                code: 'FLD000018',
                flexiLabel: 'fst-username-5',
                id: 'FRM000001-FLD000018',

                //formcontrol: 'fst-username-form-5',
                customCssClass: 'custom-css-class1',
                label: 'Username Fst 1',

                disabled: false,
                prefix: '@',
                hidden: false,
                labelMargin: 20,
                tabIndex: '1',
                suffix: 'suff',
                description: 'This is a dummy field. Field description would be here',
                hideLabel: false,
                labelPosition: 'left',
                labelWidth: 0,
                width: '50%',
                placeholder: 'Enter your Username',
                formClassValidations: {
                  customPattern: { message: 'Custom pattern is not correct.', validatorFuncName: 'asyncCustomPatternValidator' }
                },
                events: {
                  change: {
                    //event:'change',
                    handlerOwner: 'form',
                    handlerName: 'onUserNameChanged',
                    args: "'change event','My' ,'Name  ',   'Is','Khan'"
                  },
                  focus: {
                    //event:'focus',
                    handlerOwner: 'resource',
                    handlerName: 'onUserNameFocus',
                    args: "'focus event','My' ,'Name  ',   'Is','Khan'"
                  }
                },
                validations: {
                  required: {

                    'value': true,
                    'message': 'This Field is required'
                  },
                  minLength: {

                    'value': 8,
                    'message': 'Minimum length should be XXLENGTHXX'
                  },
                  maxLength: {

                    'value': 19,
                    'message': 'Minimum length should be XXLENGTHXX'
                  }
                }
              },
              {
                code: 'FLD000022',
                flexiLabel: 'pfst-assword-8',
                id: 'FRM000001-FLD000022',

                //formcontrol: 'fst-password-form-7',
                type: 'TXT',
                label: 'FST Password 2',
                prefix: '#',
                suffix: '&',
                customCssClass: 'custom-css-class2',
                labelWidth: 0,
                labelPosition: 'left',
                labelMargin: 0,

                description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
                width: '50%',
                placeholder: 'Enter your Password',
                events: {
                  input: {
                    //event:'input',
                    handlerOwner: 'form',
                    handlerName: 'onPassWordInput',
                    args: "'input','Harish','  Rathor'"
                  },
                  blur: {
                    //event:'blur',
                    handlerOwner: 'resource',
                    handlerName: 'onPassWordBlur',
                    args: "'blur','event', 'Harish'   , 'Rathor'"
                  }
                },
                validations: {
                  required: {

                    'value': true,
                    'message': 'This Field is required'
                  },
                  pattern: {

                    'value': '^[a-z0-9_-]{8,15}$',
                    'message': 'The Pattern is not correct'
                  }
                }
              },
              {
                code: 'FST000002',
                flexiLabel: 'dummy-fst-1',
                id: 'FRM000001-FST000002',
                type: 'FST',
                label: 'Some Settings',
                hideLabel: true,
                components: [
                  {
                    type: 'TXT',
                    code: 'FLD000020',
                    flexiLabel: 'fst-username-6',
                    id: 'FRM000001-FLD000020',

                    //formcontrol: 'fst-username-form-9',
                    customCssClass: 'custom-css-class1',
                    label: 'Username Fst 1',

                    disabled: false,
                    prefix: '@',
                    hidden: false,
                    labelMargin: 20,
                    tabIndex: '1',
                    suffix: 'suff',
                    description: 'This is a dummy field. Field description would be here',
                    hideLabel: false,
                    labelPosition: 'left',
                    labelWidth: 0,
                    width: '50%',
                    placeholder: 'Enter your Username',
                    formClassValidations: {
                      customPattern: { message: 'Custom pattern is not correct.', validatorFuncName: 'asyncCustomPatternValidator' }
                    },
                    events: {
                      change: {
                        //event:'change',
                        handlerOwner: 'form',
                        handlerName: 'onUserNameChanged',
                        args: "'change event','My' ,'Name  ',   'Is','Khan'"
                      },
                      focus: {
                        //event:'focus',
                        handlerOwner: 'resource',
                        handlerName: 'onUserNameFocus',
                        args: "'focus event','My' ,'Name  ',   'Is','Khan'"
                      }
                    },
                    validations: {
                      required: {

                        'value': true,
                        'message': 'This Field is required'
                      },
                      minLength: {

                        'value': 8,
                        'message': 'Minimum length should be XXLENGTHXX'
                      },
                      maxLength: {

                        'value': 19,
                        'message': 'Minimum length should be XXLENGTHXX'
                      }
                    }
                  },
                  {
                    code: 'FLD000025',
                    flexiLabel: 'pfst-assword-9',
                    id: 'FRM000001-FLD000025',

                    //formcontrol: 'fst-password-form-8',
                    type: 'TXT',
                    label: 'FST Password 2',
                    prefix: '#',
                    suffix: '&',
                    customCssClass: 'custom-css-class2',
                    labelWidth: 0,
                    labelPosition: 'left',
                    labelMargin: 0,

                    description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
                    width: '50%',
                    placeholder: 'Enter your Password',
                    events: {
                      input: {
                        //event:'input',
                        handlerOwner: 'form',
                        handlerName: 'onPassWordInput',
                        args: "'input','Harish','  Rathor'"
                      },
                      blur: {
                        //event:'blur',
                        handlerOwner: 'resource',
                        handlerName: 'onPassWordBlur',
                        args: "'blur','event', 'Harish'   , 'Rathor'"
                      }
                    },
                    validations: {
                      required: {

                        'value': true,
                        'message': 'This Field is required'
                      },
                      pattern: {

                        'value': '^[a-z0-9_-]{8,15}$',
                        'message': 'The Pattern is not correct'
                      }
                    }
                  }
                ]
              }
            ]
          }

        ]
      },
      {
        type: 'TIM',
        code: 'FLD000005',
        flexiLabel: 'time',
        label: 'Time',
        id: 'FRM000001-FLD000005',
        //formcontrol: 'time-form',

        disabled: false,
        defaultValue: { hour: 12, minute: 13, second: 13 },
        prefix: '@',
        hidden: false,
        labelMargin: 20,
        tabIndex: '1',
        suffix: 'suff',
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'top',

        labelWidth: 0,
        width: '100%',
        validations: {
          required: {

            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'TXA',
        code: 'FLD000006',
        flexiLabel: 'description',
        id: 'FRM000001-FRM000006',

        //formcontrol: 'description-form',
        label: 'Description',

        defaultValue: 'Some tet area default value',
        width: '100%',
        placeholder: 'Enter Description',
        validations: {
          required: {
            'value': true,
            'message': 'Field is required'
          },
          minLength: {

            'value': 50,
            'message': 'Minimum length required is XXLENGTHXX.'
          },
          maxLength: {

            'value': 150,
            'message': 'Maximum length required is XXLENGTHXX.'
          }
        }
      },
      {
        type: 'EDT',
        code: 'FLD000016',
        flexiLabel: 'editor',
        id: 'FRM000001-FRM000016',

        //formcontrol: 'description-form',
        label: 'Html Description',

        defaultValue: 'Some editor default value',
        width: '100%',
        placeholder: 'Enter Description',
        validations: {
          required: {
            'value': true,
            'message': 'Field is required'
          }
        }
      },
      {
        code: 'FLD000007',
        flexiLabel: 'submit',
        id: 'FRM000001-FLD000007',
        //formcontrol: 'button-form',
        type: 'BTN',
        size: 'small',
        action: 'submit',
        label: 'Submit',
        icon: 'md-save',
        width: '',
        disabled: false,
        class: ['btn', 'btn-primary']
      }
    ]
  };

  getFormSchema = function (code: String) {
    return this._schema;
  };
}
