import { Component } from '@angular/core';

@Component({
  selector: 'default-root',
  templateUrl: 'default.component.html',
  styleUrls: ['default.component.css']
})
export class FeDefaultComponent {
  public instance: any;
  public formInstance: any;

  constructor() {
    this.instance = this;
    (<any>window).curResObj = this;
  }

  onUserNameFocus(...args) {
    console.log("Resource class onUserNameFocus called arguments:", args);
  }

  onPassWordBlur(...args) {
    console.log("Resource class onPassWordBlur called argument:", args);
  }

  sendMail(row: any) {
    console.log(row);
  }

  addPerson(row: any) {
    console.log(row);
  }

  download(arg: any) {
		console.log('download');
	}

}
