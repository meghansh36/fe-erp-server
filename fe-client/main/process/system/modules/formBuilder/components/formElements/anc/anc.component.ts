
import { Component } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
  selector: 'anc-input',
  templateUrl: './anc.component.html',
  styleUrls: ['./anc.component.css', '../baseField/baseField.component.css']
})
export class FeAncComponent extends FeBaseField  {
  public properties = {
		...this.properties,
		type: 'ANC',
  };

  public applicableProperties: any = {
  	label:true,
  	hideLabel:true,
  	labelPosition:true,
  	tooltip:true,
  	errorLabel:true,
  	customCssClass:true,
  	tabIndex:true,
  	marginTop:true,
  	marginRight:true,
  	marginLeft:true,
  	marginBottom:true,
  	defaultValueType:false,
  	defaultValueSqlQuery:true,
  	defaultValueString: true,
  	nonPersistent:true,
  	dbColumn:true,
  	hidden: true,
  	clearWhenHidden: true,
  	disabled: true,
  	flexiLabel: true,
  	validations: true,
  	customFuncValidationVal: true,
  	jsonLogicVal: true,
	formClassValidationVal: true,
	events: true,
	condition: true,
	type: true,
	fldDisabledCondition: true,
	active: true,
	width: true,
  };

}
