import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return "";
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

const monthIndexArr = [ 'Mon0','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

function mmToMon( monthIndex ) {
    return monthIndexArr[ monthIndex ];
}

function monTomm( monMonth ) {
    return padNumber( monthIndexArr.indexOf( monMonth ) );
}

@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {

    formatters = {
        'dd/mm/yyyy': this.formatDDMMYYYY,
        'dd-Mon-yyyy': this.formatDMonY,
        'dd-mm-yyyy': this.formatDDMMYY
    };

    parsers = {
        //'dd/mm/yyyy': this.parseDDMMYYYY,
        'dd-Mon-yyyy': this.parseDMonY,
        'dd-mm-yyyy': this.parseDDMMYYYY
    };

    //parse(value: string, formatStr): NgbDateStruct {
    parse(value: string ): NgbDateStruct {
        const formatStr = 'dd-Mon-yyyy';
        return this.parsers[ formatStr ]( value );
    }
    
    parseDDMMYYYY(value: string): NgbDateStruct {
        if (!value) { return null; }

        const parts = value.trim().split('-');

        return {
            day: parts.length > 0 ? parseInt(parts[0], 10) : null,
            month: parts.length > 1 ? parseInt(parts[1], 10) : null,
            year: parts.length > 2 ? parseInt(parts[2], 10) : null,
        };
    }

    parseDMonY(value: string): NgbDateStruct {
        if (!value) { return null; }

        const parts = value.trim().split('-');

        return {
            day: parts.length > 0 ? parseInt(parts[0], 10) : null,
            month: parts.length > 1 ? parseInt( monTomm( parts[1] ), 10 ) : null,
            year: parts.length > 2 ? parseInt(parts[2], 10) : null,
        };
    }

    parseMMDDYYYY(value: string): NgbDateStruct {
        if (!value) { return null; }

        const parts = value.trim().split('-');

        return {
            day: parts.length > 0 ? parseInt(parts[0], 10) : null,
            month: parts.length > 1 ? parseInt(parts[1], 10) : null,
            year: parts.length > 2 ? parseInt(parts[2], 10) : null,
        };
    }

    formatDDMMYYYY(date: NgbDateStruct): string {
        let stringDate: string = ""; 
        if(date) {
            stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
            stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
            stringDate += date.year;
        }
        return stringDate;
    }

    formatDMonY( date: NgbDateStruct ) {
        const pad = (n) => Number.isInteger(n) ? ('0' + n).substr(-2) : '';
        return date ? `${pad(date.day)}-${mmToMon(toInteger(date.month))}-${date.year}` : '';
    }

    formatDDMMYY(date: NgbDateStruct): string {//dd-mm-yyyy
        const pad = (n) => Number.isInteger(n) ? ('0' + n).substr(-2) : '';
        return date ? `${pad(date.day)}-${pad(date.month)}-${date.year}` : '';
    }

    //format(date: NgbDateStruct, formatStr: string) {
    format(date: NgbDateStruct ) {
        const formatStr = 'dd-Mon-yyyy';
        return this.formatters[ formatStr ]( date );
    }
}