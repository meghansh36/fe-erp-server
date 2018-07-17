import { Component, Renderer2, ElementRef } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FeBaseComponent } from '@L1Process/system/modules/formGenerator/components/feBase.component';
import { FeValidatorsService } from '@L1Process/system/modules/formGenerator/services/validators.service';
import { FeDependentService } from '@L1Process/system/modules/formGenerator/services/dependent.service';

@Component({
  selector: 'fe-time',
  styleUrls: ['feTime.component.css'],
  templateUrl: 'feTime.component.html'
})
export class FeTimeComponent  extends FeBaseComponent{
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  constructor(public elemRef: ElementRef, config: NgbTimepickerConfig,public validator: FeValidatorsService, public dependent: FeDependentService, public render: Renderer2) {
    super(elemRef, validator, render);
    config.seconds = true;
    config.spinners = false;
  }
}
