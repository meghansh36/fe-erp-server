import { Component, OnInit, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';
@Component({
  selector: 'fst-input.fieldContainerComponent.fieldComponent',
  templateUrl: './fst.component.html',
  styleUrls: ['./fst.component.css', '../baseField/baseField.component.css']
})
export class FeFstComponent extends FeBaseField implements OnInit {

  @ViewChild('fstContainer', { read: ViewContainerRef }) fstContainer: ViewContainerRef;
  @Output() hostRef = new EventEmitter<ViewContainerRef>();

  public properties = {
    
    label: 'Fieldset',
    description: '',
    hideLabel: false,
    labelPosition: 'top',
    flexiLabel: '',
    active: true,
    components: [],
    type: 'FST',
    width: '100%',
    hidden: false
  };

  applicableProperties = {
    label: true,
    description: true,
    hideLabel: true,
    components: true,
    type: true,
    flexiLabel: true,
    active: true,
    width: true,
    hidden: true
  };



  ngOnInit() {
    console.log("initialized a new instance 1", this.properties);
		this.setRef(this.fieldControlService.getFieldRef().ref);
		this.uniqueKey = this.masterFormService.getCurrentKey();
		this.masterFormService.setProperties(this.properties);
    this.fieldControlService.addToFstCollection(this.fstContainer, this.uniqueKey);
  }
}
