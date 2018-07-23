import { FormGroup } from '@angular/forms';
import { FieldConfig } from '@L1Process/system/modules/formGenerator/models/field-config.interface';

export interface Field {
  config?: FieldConfig;
  group?: FormGroup;
  form?: any;
  formComponent?: any;
}
