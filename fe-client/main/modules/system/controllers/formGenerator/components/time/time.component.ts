import { Component, Renderer2, ElementRef } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '@L3Modules/system/controllers/formGenerator/components/base.component';
import { ValidatorsService } from '@L3Modules/system/controllers/formGenerator/services/validators.service';
import { UtilityService } from '@L3Modules/system/services/utility.service';
import { DependentService } from '@L3Modules/system/controllers/formGenerator/services/dependent.service';
import { DefaultsService } from '@L3Modules/system/services/defaults.service';

@Component({
  selector: 'fe-time',
  styleUrls: ['time.component.css'],
  templateUrl: 'time.component.html'
})
export class FeTimeComponent  extends BaseComponent{
  configPicker = {
    disableKeyPress: true,
    showMultipleYearsNavigation: true,
    drops: 'down'
  };

  constructor(public elemRef: ElementRef, config: NgbTimepickerConfig,public validator: ValidatorsService, public dependent: DependentService, public render: Renderer2,public utility: UtilityService , public defaults: DefaultsService) {
    super(elemRef, validator, render, utility, defaults);
    config.seconds = true;
    config.spinners = false;
  }
}
