import { Component, Renderer2, ElementRef } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '@L3Process/system/modules/formGenerator/components/base.component';
import { ValidatorsService } from '@L3Process/system/modules/formGenerator/services/validators.service';
import { UtilityService } from '@L3Process/system/services/utility.service';
import { DependentService } from '@L3Process/system/modules/formGenerator/services/dependent.service';
import { DefaultsService } from '@L3Process/system/services/Defaults.service';

@Component({
  selector: 'fe-time',
  styleUrls: ['time.component.css'],
  templateUrl: 'time.component.html'
})
export class FeTimeComponent  extends BaseComponent{
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  constructor(public elemRef: ElementRef, config: NgbTimepickerConfig,public validator: ValidatorsService, public dependent: DependentService, public render: Renderer2,public utility: UtilityService , public defaults: DefaultsService) {
    super(elemRef, validator, render, utility, defaults);
    config.seconds = true;
    config.spinners = false;
  }
}
