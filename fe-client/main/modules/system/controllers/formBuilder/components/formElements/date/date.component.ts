import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
import { FeDateFormatterService } from '@L1Modules/system/services/feDateFormatter.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'dat-input',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css', '../baseField/baseField.component.css'],
  providers: [{
    provide: NgbDateParserFormatter,
    useClass: FeDateFormatterService
  }]
})
export class FeDateComponent extends FeBaseField {
  selectedDate;
  config = {
    disableKeyPress: true,
    showMultipleYearsNavigation: true,
    drops: 'down'
  };
  public properties = {
    minimumDate: '',
    maximumDate: '',
    dateTimeFormat: '',
    dateFormat: '',
    type: 'DAT',
    ...this.properties
  };

  applicableProperties = {
    minimumDate: true,
    maximumDate: true,
    // dateTimeFormat: false,
    dateFormat: true,
    ...this.applicableProperties
  };
}
