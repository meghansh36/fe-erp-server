import { Injectable } from '@angular/core';
import { ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { CustomValidators } from 'ng4-validators';
import { DefaultsService } from '@L3Process/system/services/defaults.service';

@Injectable({
    providedIn: 'root'
})
export class FeValidatorsService {
    public instance;
    public _validators = {
        required: (val: any, control: AbstractControl) => Validators.required,
        maxLength: (val: any, control: AbstractControl) => Validators.maxLength(val),
        minLength: (val: any, control: AbstractControl) => Validators.minLength(val),
        pattern: (val: any, control: AbstractControl) => Validators.pattern(val),
        email: (val: any, control: AbstractControl) => Validators.email,
        commaseperatedemail: (val: any, control: AbstractControl) => this.commaSeparatedEmailValidator,
        range: (val: any, control: AbstractControl) => CustomValidators.range(val),//val =[ min, max ]
        min: (val: any, control: AbstractControl) => CustomValidators.min(val),
        max: (val: any, control: AbstractControl) => CustomValidators.max(val),
        minDate: (val: any, control: AbstractControl) => CustomValidators.minDate(val),//'2016-09-09'
        maxDate: (val: any, control: AbstractControl) => CustomValidators.maxDate(val),//'2016-09-09'
        json: (val: any, control: AbstractControl) => CustomValidators.json,
        equalTo: (val: any, control: AbstractControl) => CustomValidators.equalTo(val),
        notEqualTo: (val: any, control: AbstractControl) => CustomValidators.notEqualTo(val),
        equal: (val: any, control: AbstractControl) => CustomValidators.equal(val),
        uuid: (val: any, control: AbstractControl) => CustomValidators.uuid(val),
        base64: (val: any, control: AbstractControl) => CustomValidators.base64,
        digits: (val: any, control: AbstractControl) => CustomValidators.digits,
        url: (val: any, control: AbstractControl) => CustomValidators.url,
        lt: (val: any, control: AbstractControl) => CustomValidators.lt(val),//less than
        gt: (val: any, control: AbstractControl) => CustomValidators.gt(val),//greater than
        lte: (val: any, control: AbstractControl) => CustomValidators.lte(val),//less than
        gte: (val: any, control: AbstractControl) => CustomValidators.gte(val),
        rangeLength: (val: any, control: AbstractControl) => CustomValidators.rangeLength(val),//[ min, max ]
        number_positive:  this.numberPositiveValidator.bind(this),
        number_negative:  this.numberNegativeValidator.bind(this),
        alphanumeric:  (val: any, control: AbstractControl) => this.alphanumericValidator.bind(this),
        alphabet:  (val: any, control: AbstractControl) => this.alphabetValidator.bind(this)
    };


    protected _customValidations = {
        min: this.minValidation.bind(this),
        max: this.maxValidation.bind(this),
        minDate: this.minDateValidation.bind(this),
        maxDate: this.maxDateValidation.bind(this),
        required: this.requiredValidation.bind(this),
        range: this.rangeValidation.bind(this),
        rangeLength: this.rangeLengthValidation.bind(this),
        'number_positive': this.numberPositiveValidation.bind(this),
        'number_negative': this.numberNegativeValidation.bind(this),
        'alphanumeric': this.alphanumericValidation.bind(this),
        'alphabet': this.alphabetValidation.bind(this),
        email: this.emailValidation.bind(this),
        commaseperatedemail: this.commaseperatedemailValidation.bind(this)
    };

    constructor( protected _defaults: DefaultsService ) {
        this.instance = this;
    }

    emailValidation(value?: any) {

        const message = 'Please provide valid mail address';
        if (!value) {
            value = true;
        }
        const name ='email';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    commaseperatedemailValidation(value?: any) {
        const message = 'Please provide valid mail address(s)';
        if (!value) {
            value = true;
        }
        const name ='commaseperatedemail';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    commaSeparatedEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const regExp = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4})(,[\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}){0,4}$/;
        if (control.value !== undefined) {
            if (regExp.test(control.value)) {
                return null;
            } else {
                return { 'commaseperatedemail': true };
            }
        }
    }



    minValidation(minValue?: any) {
        console.log("minValidation", this);
        const message = `Minimum value should be ${minValue}.`;
        const name ='min';
        return FeValidatorsService.getValidation(name,  minValue, message);
    }

    maxValidation(maxValue?: any) {
        const message = `Maximum value should be ${maxValue}.`;
        const name ='max';
        return FeValidatorsService.getValidation(name,  maxValue, message);
    }

    minDateValidation(minDate?: any) {
        const message = `Minimum date should be ${minDate}.`;
        const name ='minDate';
        return FeValidatorsService.getValidation(name,  minDate, message);
    }

    maxDateValidation(maxDate?: any) {
        const message = `Maximum date should be ${maxDate}.`;
        const name ='maxDate';
        return FeValidatorsService.getValidation(name,  maxDate, message);
    }

    requiredValidation(value?: any) {
        const message = `Please provide appropriate value.`;
        const name ='required';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    rangeValidation(value?: any) {
        const message = `Value should be between ${value.min} and ${value.max}.`;
        const name ='range';
        return FeValidatorsService.getValidation(name,  [value.min, value.max], message);
    }

    rangeLengthValidation(value?: any) {
        const message = `Value length should be between ${value.min} and ${value.max}.`;
        const name ='rangeLength';
        return FeValidatorsService.getValidation(name,  [value.min, value.max], message);
    }

    numberNegativeValidation(value?: any) {
        value = 0;
        const message = `Please provide number negative only.`;
        const name ='lt';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    alphanumericValidation(value?: any) {
        value = this._defaults.PATTERN['alphanumeric'];
        const message = `Alphanumric values allowed only.`;
        const name ='alphanumeric';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    alphabetValidation(value?: any) {
        value = this._defaults.PATTERN['alphabet'];
        const message = `Alphabets values allowed only.`;
        const name ='alphabet';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    numberPositiveValidation(value?: any) {
        value = 0
        const message = `Please provide number positive only.`;
        const name ='gte';
        return FeValidatorsService.getValidation(name,  value, message);
    }

    numberNegativeValidator(value: any, control: AbstractControl) {
        return this._validators['lt'](value, control);
    }

    alphanumericValidator( control: AbstractControl): { [key: string]: boolean } | null  {
        const regExp = this._defaults.PATTERN['alphanumeric'];
        if (control.value !== undefined) {
            if (regExp.test(control.value)) {
                return null;
            } else {
                return { 'alphanumeric': true };
            }
        }
    }

    alphabetValidator( control: AbstractControl): { [key: string]: boolean } | null  {
        const regExp = this._defaults.PATTERN['alphabet'];
        if (control.value !== undefined) {
            if (regExp.test(control.value)) {
                return null;
            } else {
                return { 'alphabet': true };
            }
        }
    }

    numberPositiveValidator(value: any, control: AbstractControl) {
        console.log("numberPositiveValidator", this, this._validators);
        return this._validators['gte'](value, control);
    }

    getCustomValidation(validationName: string, value?: any) {
        if (!this._customValidations[validationName]) {
            console.log(`Custom Validation ${validationName} implementation does not exist.`);
            return '';
        }
        return this._customValidations[validationName].call(this, value);
    }


    getValidator(validationConf: any, control: AbstractControl): ValidatorFn | null {
        const validationName: string = validationConf.name;
        const validationValue: any = validationConf.value;
        if (this._validators[validationName]) {
            return this._validators[validationName](validationValue, control);
        }
        return null;
    }

    getValidators(validationConf: any, control: AbstractControl) {
        try {
            const validators = [];
            for (let name in validationConf) {
                let validation = _.assign({}, validationConf[name]);
                validation.name = name;
                let validator: ValidatorFn | null = this.getValidator(validation, control);
                if (validator) {
                    validators.push(validator);
                }
            }
            return validators;
        } catch (error) {
            console.log(error)
        }
    }

    transformToValidErr(validations) {
        let errors = [];
        for (let vName in validations) {
            let validation = _.assign({}, validations[vName]);
            validation.name = vName.toLowerCase();
            if (vName == 'maxLength' || vName == 'minLength') {
                let message = validation.message;
                message = message.replace('XXLENGTHXX', validation.value);
                validation.message = message;
            }
            errors.push(validation);
        }
        return errors;
    }

    static getValidation(name, value, message) {
        const validation = {
            [name]: {
                value,
                message
            }
        };
        return validation;
    }

}
