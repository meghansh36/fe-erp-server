import { Component } from '@angular/core';
import { FormSchemaService } from '@L3Main/services/formSchema.service';

@Component({
  selector: 'forms',
  templateUrl: 'forms.component.html',
  styleUrls: ['forms.component.css'],
  providers: [FormSchemaService]
})
export class FeFormsComponent {
  public instance: any;

  constructor(public formSchemaService: FormSchemaService) {
    this.instance = this;
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

  detail(args: any) {
    let id = args.id;
    this.formSchemaService.navigateToFormGenerator(id);
  }

}
