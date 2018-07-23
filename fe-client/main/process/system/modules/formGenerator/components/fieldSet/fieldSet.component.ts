import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { BaseComponent } from '@L3Process/system/modules/formGenerator/components/base.component';
// import { FeFormSchemaService } from '@L1Main/services/formSchema.service';
// import { FeValidatorsService } from '@L1Process/system/modules/formGenerator/services/validators.service';
// import { FeDependentService } from '@L1Process/system/modules/formGenerator/services/dependent.service';
//import { Field } from '@L1Process/system/modules/formGenerator/models/field.interface';
import { FieldConfig } from '@L1Process/system/modules/formGenerator/models/field-config.interface';
import { FormGroup } from '@angular/forms';

import * as _ from 'lodash';


@Component({
  selector: 'fe-fieldset',
  styleUrls: ['fieldSet.component.css'],
  templateUrl : 'fieldSet.component.html'
})
export class FeFieldSetComponent  implements OnInit, AfterViewInit  {
 //Inputs passed from parent form component
  public config: FieldConfig;
  public group: FormGroup;
  public form: any;
  public formComponent: any;
  
  protected _fstGroup: FormGroup ;
  protected _config: FieldConfig;

  constructor( protected _elemRef: ElementRef, protected _renderer: Renderer2 ) {

  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    if( this.hidden ) {
      this.hide();
    }
    if ( this.width ) {
      this._renderer.setStyle( this._elemRef.nativeElement, 'width', this.width );
    }
  }
  
  hide() {
    this._renderer.addClass( this._elemRef.nativeElement, 'hidden' );
  }

  show() {
    this._renderer.removeClass( this._elemRef.nativeElement, 'hidden' );
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

  get hidden() {
    return this._config.hidden;
  }

  set hidden( hidden ) {
    this._config.hidden = hidden;
  }

  get width() {
    return this._config.width;
  }

  set width( width ) {
    this._config.width = width;
  }
}
