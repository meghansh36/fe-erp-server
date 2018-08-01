import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@L3Modules/system/controllers/formGenerator/components/base.component';

@Component({
  selector: 'fe-month',
  styleUrls: ['./month.component.css'],
  templateUrl: './month.component.html'
})
export class FeMonthComponent extends BaseComponent {
  configPicker = {
    disableKeyPress: true,
    showMultipleYearsNavigation: true,
    drops: 'down'
  };
}
