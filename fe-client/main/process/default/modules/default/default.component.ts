import { Component } from '@angular/core';

@Component({
  selector: 'default-root',
  templateUrl: 'default.component.html',
  styleUrls: ['default.component.css']
})
export class FeDefaultComponent {
  public instance: any;
  
  constructor() {
    this.instance = this;
  }

  onUserNameFocus( ...args ) {
    console.log("Resource class onUserNameFocus called arguments:", args );
  }
  
  onPassWordBlur( ...args ) {
      console.log("Resource class onPassWordBlur called argument:", args );
  }  

}
