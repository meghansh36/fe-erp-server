import { Component } from '@angular/core';
import { FeBaseComponent } from '../feBase.component';
// import { FeFormSchemaService } from '@L1Main/services/formSchema.service';
// import { FeValidatorsService } from '@L1Process/system/modules/formGenerator/services/validators.service';
// import { FeDependentService } from '@L1Process/system/modules/formGenerator/services/dependent.service';
//import { Field } from '@L1Process/system/modules/formGenerator/models/field.interface';
import { FieldConfig } from '@L1Process/system/modules/formGenerator/models/field-config.interface';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'fe-fieldset',
  styleUrls: ['feFieldSet.component.css'],
  templateUrl : 'feFieldSet.component.html'
})
export class FeFieldSetComponent  {
 //Inputs passes from parent form component
  public config: FieldConfig;
  public group: FormGroup;
  public form: any;
  public formComponent: any;
  
  protected _fstGroup: FormGroup ;
  protected _config: FieldConfig;

  ngOnInit() {
    this.init();
  }

  init() {
    this._config = _.assign( {}, this.config );
    this.fstGroup = this.group[ this.flexiLabel ];
  }

  get fstGroup() {
    return this._fstGroup;
  }

  set fstGroup( fstGroup ) {
    this._fstGroup = fstGroup;
  }

  get hideLegend() {
    return this._config.hideLabel;
  }

  get id() {
    return this._config.id;
  }

  get label() {
    return this._config.label;
  }

  get flexiLabel() {
    return this._config.flexiLabel;
  }

  get components() {
    return this._config.components;
  }
}
