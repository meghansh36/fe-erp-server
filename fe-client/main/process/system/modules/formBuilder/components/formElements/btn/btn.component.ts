import { Component, OnInit } from '@angular/core';
import { FeBaseField } from '../baseField/baseField.component';

@Component({
	selector: 'btn-input.button-input',
	templateUrl: './btn.component.html',
	styleUrls: ['./btn.component.css', '../baseField/baseField.component.css']
})
export class FeBtnComponent extends FeBaseField implements OnInit {

	public properties = {
		theme: 'default',
		size: 'small',
		btnLeftIcon: '',
		btnRightIcon: '',
		...this.properties,
		type: 'BTN',

	};

	public applicableProperties = {
		theme: true,
		size: true,
		btnLeftIcon: true,
		btnRightIcon: true,
		...this.applicableProperties,
		labelPosition: false,
		labelWidth: false,
		labelMargin: false,
		hideLabel: false,
		width: true,
		defaultValueType: false,
		label: true,
	};

	//9627233491

	get tooltipPlacement() {
		return this.defaults.BTN_TOOLTIP_PLACEMENT;
	  }

	get icon() {
		return this.properties.icon;
	}

	get theme() {
		return this.properties.theme;
	}

	get btnLeftIcon() {
		return this.properties.btnLeftIcon;
	}

	get btnRightIcon() {
		return this.properties.btnRightIcon;
	}

	get size() {
		return this.properties.size;
	}

}
