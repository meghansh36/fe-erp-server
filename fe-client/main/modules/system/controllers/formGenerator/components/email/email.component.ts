import { Component } from '@angular/core';
import { BaseComponent } from '@L3Modules/system/controllers/formGenerator/components/base.component';

@Component({
  selector: 'fe-email',
  styleUrls: ['email.component.css'],
  templateUrl: 'email.component.html'
})
export class FeEmailComponent extends BaseComponent {

  _addExtraValidations () {
    super._addExtraValidations();
    this._addNgValidation(
      this._validator.getCustomValidation.call(
        this._validator,
        'email',
        true
      )
    );
  }
}
