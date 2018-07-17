import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FeButtonComponent } from '@L1Process/system/modules/formGenerator/components/feButton/feButton.component';
import { FeTextComponent } from '@L1Process/system/modules/formGenerator/components/feText/feText.component';
import { FeTextAreaComponent } from '@L1Process/system/modules/formGenerator/components/feTextArea/feTextArea.component';
import { FeSelectComponent } from '@L1Process/system/modules/formGenerator/components/feSelect/feSelect.component';
import { FeMultiSelectComponent } from '@L1Process/system/modules/formGenerator/components/feMultiSelect/feMultiSelect.component';
import { FeDateComponent } from '@L1Process/system/modules/formGenerator/components/feDate/feDate.component';
import { FeTimeComponent } from '@L1Process/system/modules/formGenerator/components/feTime/feTime.component';
import { FeAutoCompleteComponent } from '@L1Process/system/modules/formGenerator/components/feAutoComplete/feAutoComplete.component';
import { FeNumberComponent } from '@L1Process/system/modules/formGenerator/components/feNumber/feNumber.component';
import { FeCheckBoxComponent } from '@L1Process/system/modules/formGenerator/components/feCheckBox/feCheckBox.component';
import { FeRadioComponent } from '@L1Process/system/modules/formGenerator/components/feRadio/feRadio.component';
import { FeFieldSetComponent } from '@L1Process/system/modules/formGenerator/components/feFieldSet/feFieldSet.component';
import { FeEmailComponent } from '@L1Process/system/modules/formGenerator/components/feEmail/feEmail.component';
import { FeFilComponent } from '@L1Process/system/modules/formGenerator/components/feFile/feFile.component';
import { FeAnchorComponent } from '@L1Process/system/modules/formGenerator/components/feAnchor/feAnchor.component';
import { FeHiddenComponent } from '@L1Process/system/modules/formGenerator/components/feHidden/feHidden.component';
import { FeBlankComponent } from '@L1Process/system/modules/formGenerator/components/feBlank/feBlank.component';
import { FeHtmlEditorComponent } from '@L1Process/system/modules/formGenerator/components/feHtmlEditor/feHtmlEditor.component';
import { FeIconicButtonComponent } from '@L1Process/system/modules/formGenerator/components/feIconicButton/feIconicButton.component';

import { Field } from '@L1Process/system/modules/formGenerator/models/field.interface';
import { FieldConfig } from '@L1Process/system/modules/formGenerator/models/field-config.interface';

const components: { [type: string]: Type<Field> } = {
  BTN: FeButtonComponent,
  TXT: FeTextComponent,
  SEL: FeSelectComponent,
  TXA: FeTextAreaComponent,
  DAT: FeDateComponent,
  TIM: FeTimeComponent,
  ACS: FeAutoCompleteComponent,
  NUM: FeNumberComponent,
  CHK: FeCheckBoxComponent,
  RAD: FeRadioComponent,
  MSL: FeMultiSelectComponent,
  EML: FeEmailComponent,
  FIL: FeFilComponent,
  FST: FeFieldSetComponent,
  ANC: FeAnchorComponent,
  BLK: FeBlankComponent,
  HID: FeHiddenComponent,
  ICB: FeIconicButtonComponent,
  EDT: FeHtmlEditorComponent
};

@Directive({
  selector: '[feField]'
})
export class FeFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  schema: any;

  @Input()
  group: FormGroup;

  @Input()
  form: any;

  @Input()
  formComponent: any;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.form = this.form;
      this.component.instance.formComponent = this.formComponent;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }

    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.form = this.form;
    this.component.instance.formComponent = this.formComponent;
    this.form.formComponent = this.formComponent;
    this.formComponent.componentInstances[ this.config.flexiLabel ] = this.component.instance;
  }
}
