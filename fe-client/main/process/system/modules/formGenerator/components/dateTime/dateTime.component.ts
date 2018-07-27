import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DateComponent } from '@L3Process/system/modules/formGenerator/components/date/date.component';


@Component({
  selector: 'fe-dateTime',
  styleUrls: ['dateTime.component.css'],
  templateUrl: 'dateTime.component.html',
})
export class FeDateTimeComponent extends DateComponent {
}
