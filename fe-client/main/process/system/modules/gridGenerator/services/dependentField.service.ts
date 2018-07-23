import { Injectable } from '@angular/core';
import { FeCacheService } from '@L1Main/services/feCache.service';

@Injectable({
    providedIn: 'root'
})
export class FeDependentFieldService {

    protected data = [];
    protected lovCodes = [];

    getHtmlSEL(element) {
        let html = `<label class="form-control-label" id='LAB_${element.code}' for='child_${element.code}'>${element.label}</label>
        <select class="form-control" id="OPR_${element.code}">
        <option value="equals">equals</option>
        </select>&nbsp;
         <select class="form-control" id='child_${element.code}' >
         <option value="">--select--</option>`;
        const options = element.lov;
        options.forEach((ele) => {
            html += `<option value='${ele.code}'>${ele.meaning}</option>`;
        });
        html += '</select>';
        return html;
    }

    private fieldsHtml = {
        SEL: this.getHtmlSEL,
    }



    dependentDataOfparent = {
        "IND": [
            {
                "flexiLabel": "state",
                "label": "State",
                "type": "SEL",
                "code": "FLD0008170",
                "children": [],
                "lov": [
                    {
                        "code": "102",
                        "meaning": "Ahmedabad, Gujarat",
                        "tip": "Ahmedabad, Gujarat"
                    },
                    {
                        "code": "98",
                        "meaning": "Barnala, Punjab",
                        "tip": "Barnala, Punjab"
                    },
                    {
                        "code": "97",
                        "meaning": "Chandigarh, Punjab",
                        "tip": "Chandigarh, Punjab"
                    },
                    {
                        "code": "79",
                        "meaning": "Chennai, Tamil Nadu",
                        "tip": "Chennai, Tamil Nadu"
                    },
                    {
                        "code": "77",
                        "meaning": "Delhi, Delhi",
                        "tip": "Delhi, Delhi"
                    }
                ]
            }
        ],
        "USA": [
            {
                "flexiLabel": "state",
                "type": "SEL",
                "label": "State",
                "code": "FLD0008170",
                "children": [],
                "lov": [
                    {
                        "code": "102",
                        "meaning": "Canada",
                        "tip": "Canada"
                    },
                    {
                        "code": "91",
                        "meaning": "Florida",
                        "tip": "Florida"
                    },
                    {
                        "code": "127",
                        "meaning": "Washington",
                        "tip": "Washington"
                    }
                ]
            }
        ]
    }

    constructor(protected cache: FeCacheService) { }

    getChild(value) {
        let cache = this.cache.getDataFromStack(value);
        if (cache) {
            return cache[value];
        }
        else {
            let data = this.dependentDataOfparent[value];
            this.cache.setStackData(data, value);
            return data;
        }
    }

    getFieldHtml(type, element) {
        if (this.fieldsHtml[type]) {
            return this.fieldsHtml[type](element);
        }
    }

    dependentData(value) {
        return this.dependentDataOfparent[value];
    }

    storeValueOfChild(code: string, val: string) {
        this.data = this.data.filter((ele) => ele.code != code);
        this.data.push({ code: code, val: val });
        console.log(this.data);
    }

    getChildCode(val: any) {
        let temp = this.data.find((obj) => obj.code == val);
        return temp;
    }

    setLovCode(lov: any) {
        lov.forEach((ele) => {
            this.lovCodes.push({ code: ele.code, label: ele.meaning });
        })
        console.log(this.lovCodes);
    }

    getLovCode(label: string) {
        let temp = this.lovCodes.find((obj) => obj.label == label);
        return temp;
    }
}
