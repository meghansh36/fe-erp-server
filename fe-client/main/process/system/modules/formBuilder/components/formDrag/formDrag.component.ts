import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilderService } from '@L3Process/system/modules/formBuilder/services/formBuilder.service';

@Component({
  selector: 'form-drag',
  templateUrl: './formDrag.component.html',
  styleUrls: ['./formDrag.component.css']
})
export class FeFormDragComponent implements OnInit {

  elementList: Object  = null;
  @Input() elementListToLoad: string;

  constructor(private formService: FormBuilderService) {
  }
  ngOnInit() {
    this.elementList = this.formService.getElementList(this.elementListToLoad);
   }


}