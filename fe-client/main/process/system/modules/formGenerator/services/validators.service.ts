import { Injectable } from '@angular/core';
import { ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class FeValidatorsService {
    private validations = {
        'required': (val) => Validators.required,
        'maxLength': (val) => Validators.maxLength(val),
        'minLength': (val) => Validators.minLength(val),
        'pattern': (val) => Validators.pattern(val),
        'email': (val) => Validators.email
    }

    getValidator( validationConf: any ): ValidatorFn | null {
        let validationName: string = validationConf.name;
        let validationValue: any = validationConf.value;
        if ( this.validations[ validationName ]  && validationValue ) { 
            return this.validations[ validationName ]( validationValue );
        }
        return null;
    }

    getValidators( validationConf ) {
        try {
            let validators = [];
            for( let name in validationConf )  {
                let validation = _.assign({}, validationConf[ name ]);
                validation.name = name;
                let validator: ValidatorFn | null = this.getValidator( validation );
                if ( validator ) {
                    validators.push( validator );
                }
            }
            return  validators; 
        } catch (error) {
            console.log( error )
        }
        
    }

    transformToValidErr( validations ) {
        let errors = [];
        for ( let vName in validations ) {
            let validation = _.assign( {}, validations[ vName ] );
            validation.name = vName.toLowerCase();
            if ( vName == 'maxLength' || vName == 'minLength' ) {
                let message = validation.message;
                message = message.replace( 'XXLENGTHXX', validation.value )
                validation.message = message
            }
            errors.push( validation );
        }
        return errors;
    }

}
