import { Injectable } from '@angular/core';



@Injectable()
export class FeDefaultsService {

    protected _buttonTheme: string = 'secondary';
    protected _fieldWidth: string = '100%';
    protected _labelPosition: string = 'top';
    protected _buttonSize: string = 'small';
    protected _decimalLimit: number = 5;
    protected _integerLimit : number = 10;
    protected _calendarMinDate: string = '01-Jan-2009';
    protected _calendarMaxDate: string = '31-Dec-2025';
    protected _btnTooltipSide: string = 'top';


    public  PATTERN = {
        'number_positive': /^\d*[1-9]\d*$/,
        'number_negative': /^-?\d{2}(\.\d+)?$/,
        'alphanumeric': /^[a-z0-9]+$/i,
        'alphabet': /^[a-zA-Z_]*$/
    };
   
    protected _validations: any[] = [
        {
            code: 'required',
            meaning: 'Required'
        },
        {
            code: 'number_positive',
            meaning: 'Number Positive'
        },
        {
            code: 'number_negative',
            meaning: 'Number Negative'
        },
        {
            code: 'email',
            meaning: 'Email'
        },
        {
            code: 'commaseperatedemail',
            meaning: 'Multiple Email'
        },
        {
            code: 'alphabet',
            meaning: 'Alphabet'
        },
        {
            code: 'alphanum',
            meaning: 'Alphanumeric'
        }
    ];

    

    protected _buttonThemeClasses = {
        "primary": "btn btn-primary",
        "secondary": "btn btn-secondary",
        "success": "btn btn-success",
        "danger": "btn btn-danger",
        "warning": "btn btn-warning",
        "info": "btn btn-info",
        "light": "btn btn-light",
        "dark": "btn btn-dark",
        "link": "btn btn-link",
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
        'large': 'btn-lg',
        'small': 'btn-sm',
        'medium': 'btn-md'
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
    

}