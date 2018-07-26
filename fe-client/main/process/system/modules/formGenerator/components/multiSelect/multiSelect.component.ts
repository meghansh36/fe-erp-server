import { Component } from '@angular/core';
import { SelectComponent } from '@L3Process/system/modules/formGenerator/components/select/select.component';

@Component({
  selector: 'feMultiSelect',
  styleUrls: ['./multiSelect.component.css', '../select/select.component.css'],
  templateUrl: './multiSelect.component.html'
})
export class FeMultiSelectComponent extends SelectComponent {
}
