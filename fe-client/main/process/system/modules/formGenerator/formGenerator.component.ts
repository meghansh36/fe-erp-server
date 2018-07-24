import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location, PlatformLocation } from "@angular/common";
import { FormSchemaService } from "@L3Main/services/formSchema.service";

@Component({
  selector: "formGenerator",
  styleUrls: ["formGenerator.component.css"],
  templateUrl: "formGenerator.component.html",
  providers: [FormSchemaService]
})
export class FeFormGeneratorComponent implements OnInit {
  protected _schema: any;

  @HostListener("window:popstate", ["$event"])
  onPopState(event) {
    this._location.back();
  }

  constructor(
    protected _route: ActivatedRoute,
    protected _formSchemaService: FormSchemaService,
    protected _location: Location
  ) {}

  protected _beforeNgOnInit() {}

  protected _afterNgOnInit() {}

  ngOnInit() {
    this._beforeNgOnInit();
    this._init();
    this._afterNgOnInit();
  }

  _init() {
    this._route.params.subscribe(this._handleRouteParams.bind(this));
  }

  protected _handleRouteParams(params) {
    console.log("_handleRouteParams params", params);
    this._initFormSchema(params.formId);
  }

  protected _initFormSchema(formId?: any) {
    if (formId) {
      this._formSchemaService.getFormSchemaById(formId).subscribe(data => {
        const form = [...data.body.data];
        if (form) {
          this.schema = form;
        } else {
          console.log("No schema found");
        }
      });
    }
  }

  get schema() {
    return this._schema;
  }

  set schema(schema) {
    this._schema = schema;
  }
}
