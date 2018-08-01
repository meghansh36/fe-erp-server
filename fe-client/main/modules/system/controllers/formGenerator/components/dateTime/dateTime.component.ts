import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DateComponent } from '@L3Modules/system/controllers/formGenerator/components/date/date.component';


@Component({
  selector: 'fe-dateTime',
  styleUrls: ['dateTime.component.css'],
  templateUrl: 'dateTime.component.html',
})
export class FeDateTimeComponent extends DateComponent {
}
