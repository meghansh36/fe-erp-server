/* @Component Description
 *
 * This component lists the draggable fields in the basic, advance, layout containers.
 */

import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilderService } from '@L3Process/system/modules/formBuilder/services/formBuilder.service';

@Component({
  selector: 'form-drag',
  templateUrl: './formDrag.component.html',
  styleUrls: ['./formDrag.component.css']
})
export class FeFormDragComponent implements OnInit {

  elementList: Object  = null;
  // get the elementListName from the formBuilder component
  @Input() elementListName: any;

  constructor(private formService: FormBuilderService) {}
  ngOnInit() {
    // get the list of elements from the formBuilderService
    this.elementList = this.formService.getElementList(this.elementListName);
   }


}