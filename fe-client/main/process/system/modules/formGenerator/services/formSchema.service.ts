import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FeFormSchemaService {

  constructor() { }

  private _schema = {
    id: 'FRM000001',
    name: 'form',
    code: 'FRM000001',
    label: 'Employee Personal Information',
    components: [
      {
        type: 'TXT',
        code: 'FLD000001',
        flexiLabel: 'username',
        id: 'FRM000001-FLD000001',
        style: {},
        formcontrol: 'username-form',
        customCssClass: 'custom-css-class1',
        label: 'Username',
        height: '',
        disabled: false,
        prefix: '@',
        hidden: false,
        labelMargin: 20,
        tabIndex: '1',
        suffix: 'suff',
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'left',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        labelWidth: 0,
        width: '100%',
        placeholder: 'Enter your Username',
        formClassValidations: {
          customPattern: { name: 'customPattern', message: 'Custom pattern is not correct.', validatorFuncName: 'asyncCustomPatternValidator' }
        },
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          },
          minLength: {
            'name': 'minLength',
            'value': 8,
            'message': 'Minimum length should be XXLENGTHXX'
          },
          maxLength: {
            'name': 'maxLength',
            'value': 19,
            'message': 'Minimum length should be XXLENGTHXX'
          }
        }
      },
      {
        code: 'FLD000002',
        flexiLabel: 'password',
        id: 'FRM000001-FLD000002',
        style: {},
        formcontrol: 'password-form',
        type: 'TXT',
        label: 'Password',
        prefix: '#',
        suffix: '&',
        customCssClass: 'custom-css-class2',
        labelWidth: 0,
        labelPosition: 'left',
        labelMargin: 0,
        height: '',
        description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
        width: '50%',
        placeholder: 'Enter your Password',
        validations:{ 
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          },
          pattern: {
            'name': 'pattern',
            'value': '^[a-z0-9_-]{8,15}$',
            'message': 'The Pattern is not correct'
          }
        }
      },
      {
        code: 'FLD000014',
        flexiLabel: 'email',
        id: 'FRM000001-FLD000014',
        style: {},
        formcontrol: 'email-form',
        type: 'EML',
        label: 'Email',
        prefix: '',
        suffix: '@',
        customCssClass: 'custom-css-class2',
        labelWidth: 0,
        labelPosition: 'left',
        labelMargin: 0,
        height: '',
        description: 'This is a dummy field. Field description would be here.asdfasdfsadfsdfsdfsfsfsf',
        width: '50%',
        placeholder: 'Enter your Password',
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          },
          email: {
            'name': 'email',
            'value': true,
            'message': 'This is not vaid email format'
          }
        }
      },
      {
        type: 'NUM',
        code: 'FLD000009',
        flexiLabel: 'number',
        id: 'FRM000001-FLD000009',
        style: {},
        formcontrol: 'number-form',
        label: 'Number',
        height: '',
        width: '40%',
        placeholder: 'Enter your Number',
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          }
        },
        customValidations: {
          agelimit: {
            name: 'agelimit',
            validatorFn: function (control: AbstractControl): { [key: string]: boolean } | null { if (control.value !== undefined && (isNaN(control.value) || control.value < 50)) { return { 'agelimit': true }; } return null; },
            message: 'Age should be less than 50'
          }
        }
      },
      {
        type: 'TXT',
        code: 'FLD000009',
        flexiLabel: 'mask',
        id: 'FRM000001-FLD000019',
        style: [],
        formcontrol: 'mask-form',
        label: 'Mask Input',
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        height: '',
        width: '40%',
        placeholder: 'Enter your USA number',
        validators: [
          {
            'name': 'required',
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
        style: {},
        formcontrol: 'auto-form',
        label: 'Country',
        height: '',
        width: '100%',
        placeholder: 'Enter your Country',
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'SEL',
        code: 'FLD000003',
        flexiLabel: 'gender',
        label: 'Gender',
        placeholder: '--SELECT--',
        options: ['male', 'female', 'others'],
        style: [{ 'name': 'width', 'value': '221px' }],
        id: 'FRM000001-FLD000003',
        formcontrol: 'select-form',
        height: '',
        disabled: false,
        prefix: '@',
        hidden: false,
        labelMargin: 20,
        tabIndex: '1',
        suffix: 'suff',
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'left',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        labelWidth: 0,
        width: '100%',
        
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'SEL',
        code: 'FLD000023',
        flexiLabel: 'country',
        label: 'Country',
        isParent: 'Y',
        placeholder: '--SELECT--',
        options: ['India', 'USA', 'Germany'],
        style: [{ 'name': 'width', 'value': '221px' }],
        id: 'FRM000001-FLD000023',
        formcontrol: 'select-form',
        validators: [{ 'name': 'required', 'value': true }]
      },
      {
        type: 'FIL',
        code: 'FLD000015',
        flexiLabel: 'file',
        label: 'file',
        id: 'FRM000001-FLD000015',
        formcontrol: 'file-form',
        validations: {
          required: {
            'name': 'required',
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
        options: ['male', 'female', 'others'],
        style: [{ 'name': 'width', 'value': '221px' }],
        id: 'FRM000001-FLD000004',
        formcontrol: 'select-form',
        validations: {
          required: {
            'name': 'required',
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
        formcontrol: 'check-form',
        validations: {
          required: {
            'name': 'required',
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
        options: ['male', 'female', 'others'],
        id: 'FRM000001-FLD000011',
        formcontrol: 'radio-form',
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      {
        type: 'DAT',
        code: 'FLD000004',
        flexiLabel: 'date',
        label: 'Date',
        id: 'FRM000001-FLD000004',
        formcontrol: 'date-form',
        placeholder: 'dd-mm-yyyy',
        height: '',
        disabled: false,
        prefix: '@',
        hidden: false,
        labelMargin: 20,
        tabIndex: '1',
        suffix: 'suff',
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'bottom',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        labelWidth: 0,
        width: '100%',
        customValidations: {
          yearlimit: {
            name: 'yearlimit',
            validatorFn: function (control: AbstractControl): { [key: string]: boolean } | null { if (control.value !== undefined && (isNaN(control.value.year) || control.value.year < 2010)) { return {       'yearlimit': true }; } return null; },
            'message': 'Year should be greater than 2010'
          }
        }
      },
      {
        type: 'TIM',
        code: 'FLD000005',
        flexiLabel: 'time',
        label: 'Time',
        id: 'FRM000001-FLD000005',
        formcontrol: 'time-form',
        height: '',
        disabled: false,
        prefix: '@',
        hidden: false,
        labelMargin: 20,
        tabIndex: '1',
        suffix: 'suff',
        description: 'This is a dummy field. Field description would be here',
        hideLabel: false,
        labelPosition: 'right',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        labelWidth: 0,
        width: '100%',
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'This Field is required'
          }
        }
      },
      /*{
        type: 'FST',
        code: 'FLD000014',
        flexiLabel: 'fieldset',
        label: 'Fieldset',
        id: 'FRM000001-FLD000014',
        formcontrol: 'field-form',
      },*/
      {
        type: 'TXA',
        code: 'FLD000006',
        flexiLabel: 'description',
        id: 'FRM000001-FRM000006',
        style: {},
        formcontrol: 'description-form',
        label: 'Description',
        height: '',
        width: '100%',
        placeholder: 'Enter Description',
        validations: {
          required: {
            'name': 'required',
            'value': true,
            'message': 'Field is required'
          },
          minLength: {
            'name': 'minLength',
            'value': 50,
            'message': 'Minimum length required is XXLENGTHXX.'
          },
          maxLength: {
            'name': 'maxLength',
            'value': 150,
            'message': 'Maximum length required is XXLENGTHXX.'
          }
        }
      },
      {
        code: 'FLD000007',
        flexiLabel: 'submit',
        id: 'FRM000001-FLD000007',
        formcontrol: 'button-form',
        type: 'BTN',
        action: 'submit',
        label: 'Submit',
        height: '',
        width: '',
        disabled: false,
        value: 'submit',
        class: ['btn', 'btn-primary']
      }
    ]
  };

  getFormSchema = function (code: String) {
    return this._schema;
  };
}
