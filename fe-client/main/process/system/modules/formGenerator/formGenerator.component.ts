import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { FormSchemaService } from '@L3Main/services/formSchema.service';

@Component({
    selector: 'formGenerator',
    styleUrls: ['formGenerator.component.css'],
    templateUrl: 'formGenerator.component.html',
    providers: [FormSchemaService]
})
export class FeFormGeneratorComponent implements OnInit {
    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        console.log('Back button pressed');
        this.location.back();
    }

    protected _schema: any;

    get schema() {
        return this._schema;
    }

    set schema(schema) {
        this._schema = schema;
    }

    constructor(public route: ActivatedRoute, public formSchemaService: FormSchemaService, public location: Location) { }

    ngOnInit() {
      this.schema = this.formSchemaService.getFormSchema(101);
       /*  this.route.params
            .filter(params => params.id)
            .subscribe(params => {
                let id = params.id;
                this.getSchema(id);
            }) */
    }

    getSchema(id: number) {
        //this.schema = this.formSchemaService.getFormSchema(id);
        /* if (form) {
            this.schema = form;
            console.log(this.schema);
        }
        else {
            console.log('no schema found');
        } */
    }

}
