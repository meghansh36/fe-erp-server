import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FeDependentService {
    allDependentData = [
        {
            'childOf': 'parent',
            'flexiLabel': 'child',
            'type': 'SEL',
            'states': {
                'India': ['Delhi', 'Mumbai', 'Chennai'],
                'USA': ['Canada', 'Washington', 'Florida'],
                'Germany': ['Berlin', 'Hamburg', 'Bavaria'],
            }
        }
    ];

    dependentDataOfparent = {
        "IND": [
            {
                "flexiLabel": "child",
                "fieldType": "SEL",
                "fieldCode": "FLD0008170",
                "data": [
                    {
                        "code": "102",
                        "meaning": "Ahmedabad, Gujarat",
                        "tip": "Ahmedabad, Gujarat"
                    },
                    {
                        "code": "91",
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
                "flexiLabel": "child",
                "fieldType": "SEL",
                "fieldCode": "FLD0008170",
                "data": [
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
                        "code": "97",
                        "meaning": "Washington",
                        "tip": "Washington"
                    }
                ]
            }
        ]
    }

    productsAfterChangeEvent = [];

    dependentData(flexilabel, value) {
        return this.dependentDataOfparent[value];
    }
}
