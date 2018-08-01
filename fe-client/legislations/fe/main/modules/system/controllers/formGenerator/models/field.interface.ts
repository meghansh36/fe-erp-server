import { FormGroup } from '@angular/forms';
import { FieldConfig } from '@L1Modules/system/controllers/formGenerator/models/field-config.interface';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
  form: any;
  formComponent: any;
}
