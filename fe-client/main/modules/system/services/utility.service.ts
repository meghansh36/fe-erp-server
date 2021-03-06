import { Injectable, Renderer2 } from "@angular/core";
import { DefaultsService } from "@L3Modules/system/services/defaults.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FieldConfig } from "@L1Modules/system/controllers/formGenerator/models/field-config.interface";


@Injectable({
	providedIn: "root"
})
export class FeUtilityService {
	public renderer: Renderer2; //initialized from field components
	constructor(protected _defaults: DefaultsService) {}

	evalFnArgs(argsStr) {
		try {
			const evaluatedArgsArr = [];
			argsStr = argsStr.trim().split(",");
			argsStr.forEach(value => {
				value = value.trim();
				const evalStr = eval(value);
				evaluatedArgsArr.push(evalStr);
			});
			return evaluatedArgsArr;
		} catch (error) {
			console.log(error);
		}
	}

	fieldEventHandler(eventName, handlerData, fieldComponent, event) {
		try {
			let handlerOwnerType = handlerData.handlerOwner;
			const handlerFnName = handlerData.handlerName;
			const args = handlerData.args;
			let ownerObject: any = {};
			if (!handlerOwnerType || handlerOwnerType == "form") {
				handlerOwnerType = "form";
			} else if (handlerOwnerType == "resource") {
				handlerOwnerType = "resource";
			} else {
				console.log(
					`Handler owner type ${handlerOwnerType} is not supported.`
				);
				return;
			}
			ownerObject = fieldComponent[handlerOwnerType]; //this.resource or this.form
			if (!ownerObject) {
				console.log(
					`Event handler function owner ${handlerOwnerType} object does not exist in current field component object. So can not call bound function.`
				);
				return;
			}

			if (
				ownerObject[handlerFnName] &&
				typeof ownerObject[handlerFnName] == "function"
			) {
				const argsArr = this.evalFnArgs(args);
				argsArr.push(fieldComponent);
				argsArr.push(event);
				ownerObject[handlerFnName].apply(ownerObject, argsArr);
			} else {
				console.log(
					`Event handler ${handlerFnName} does not exist in ${handlerOwnerType} class for event ${eventName}`
				);
			}
		} catch (error) {
			console.log(error);
		}
	}

	getFieldClasses(fieldComponent, editMode?: boolean) {
		const type = fieldComponent.type;
		const customCssClass = fieldComponent.customCssClass || "";

		if (fieldComponent.type === "HID" && !editMode) {
			this.renderer.addClass(
				fieldComponent._elemRef.nativeElement,
				"hidden"
			);
		}

		let fieldContainerClasses = {};
		let classesStr = `form-field-container frm-fld-container ${type}-container`;
		if (fieldComponent.prefix || fieldComponent.suffix) {
			classesStr += " input-group";
		}
		fieldContainerClasses = this.makeCssClassesObj(classesStr);

		let labelPosition = this._defaults.LABEL_POSITION;
		if (fieldComponent.labelPosition) {
			labelPosition = fieldComponent.labelPosition;
		}

		let labelAlignment = this._defaults.LABEL_ALIGNMENT[ labelPosition ];
		if (fieldComponent.labelAlignment) {
			labelAlignment = fieldComponent.labelAlignment;
		} else {
			fieldComponent.labelAlignment = labelAlignment;
		}

		let fieldMainWrapperClasses = {};
		classesStr = `fe-field ${type}-container form-group  ${labelPosition}-labeled-field`;
		if (fieldComponent.hidden && !editMode) {
			classesStr += " hidden";
		}

		fieldMainWrapperClasses = this.makeCssClassesObj(classesStr);

		let fieldLabelContainerClasses = {};
		classesStr = `fe-field-container field-label-container align-${labelAlignment} ${type}-label-container`;
		if (fieldComponent.hideLabel) {
			classesStr += " hidden";
		}
		if (fieldComponent.hasTextLenghtLimit) {
			classesStr += " has-text-limit";
		}
		fieldLabelContainerClasses = this.makeCssClassesObj(classesStr);

		let fieldWrapperClasses = {};
		classesStr = `field-wrapper ${type}-field-wrapper field-label-${labelPosition}`;
		fieldWrapperClasses = this.makeCssClassesObj(classesStr);

		let fieldTooltipWrapperClasses = {};
		classesStr = `field-tooltip-wrapper ${type}-tooltip-wrapper`;
		fieldTooltipWrapperClasses = this.makeCssClassesObj(classesStr);

		let fieldTooltipContainerClasses = {};
		classesStr = `field-tooltip ${type}-tooltip`;
		fieldTooltipContainerClasses = this.makeCssClassesObj(classesStr);

		let fieldDescWrapperClasses = {};
		classesStr = `field-desc-wapper ${type}-description-wapper`;
		fieldDescWrapperClasses = this.makeCssClassesObj(classesStr);

		let fieldDescContainerClasses = {};
		classesStr = `field-description-container form-text text-muted ${type}-description-container`;
		fieldDescContainerClasses = this.makeCssClassesObj(classesStr);

		let labelClasses = {};
		classesStr = `field-label ${type}-label`;
		if (fieldComponent.required) {
			classesStr += ` mandatory-field-label`;
		}
		labelClasses = this.makeCssClassesObj(classesStr);

		let fieldErrorWrapperClasses = {};
		classesStr = `field-error-wrapper mt-1 ${type}-error-wrapper`;
		fieldErrorWrapperClasses = this.makeCssClassesObj(classesStr);

		let fieldClasses = {};
		classesStr = `form-field ${type}-field ${customCssClass}`;
		if (fieldComponent.required) {
			classesStr += ` mandatory-field`;
		}
		fieldClasses = this.makeCssClassesObj(classesStr);

		let nestedFieldContainerClasses = {};
		classesStr = `feFld-container fe-field-container fe-${type}-wrapper`;
		nestedFieldContainerClasses = this.makeCssClassesObj(classesStr);

		let classes: any = {
			fieldMainWrapperClasses,
			fieldWrapperClasses,
			fieldLabelContainerClasses,
			fieldContainerClasses,
			fieldTooltipWrapperClasses,
			fieldTooltipContainerClasses,
			fieldDescWrapperClasses,
			fieldDescContainerClasses,
			labelClasses,
			fieldErrorWrapperClasses,
			fieldClasses,
			nestedFieldContainerClasses
		};
		if (fieldComponent.type === "BTN" || fieldComponent.type === "ICB") {
			classes = this.addButtonProps(fieldComponent, classes);
		}
		classes = fieldComponent._beforeSetDefaultClasses(classes);
		return classes;
	}

	makeCssClassesObj(cssClassesStr: string): any {
		const cssClassesObj = {};
		const cssClassArr = cssClassesStr.trim().split(" ");
		cssClassArr.forEach(cssClass => {
			cssClassesObj[cssClass] = true;
		});
		return cssClassesObj;
	}

	getFieldStyles(fieldComponent, editMode?: boolean) {
		const fieldLabelContainerStyle: any = {};
		const fieldMainWrapperStyle = {};

		const labelWidth = fieldComponent.labelWidth;
		const labelMargin = fieldComponent.labelMargin;

		if (labelWidth) {
			fieldLabelContainerStyle.width = `${labelWidth}`;
		}

		let fieldWidth = this._defaults.FIELD_WIDTH;
		if (fieldComponent.width) {
			fieldWidth = fieldComponent.width;
		} else {
			fieldComponent.width  = fieldWidth;
		}
		if ( fieldComponent.type === 'BTN'  ) {
			fieldWidth = this._defaults.BTN_DEFAULT_WIDTH;
		}
		if (fieldWidth) {
			this.renderer.setStyle(
				fieldComponent._elemRef.nativeElement,
				"width",
				fieldWidth
			);
		}

		if (labelMargin) {
			const margin: string = `${labelMargin}`;
			let marginSide: string = "margin-top";

			switch (fieldComponent.labelPosition) {
				case "bottom": {
					marginSide = "margin-top";
					break;
				}
				case "left": {
					marginSide = "margin-right";
					break;
				}
				case "right": {
					marginSide = "margin-left";
					break;
				}
				default: {
					marginSide = "margin-top";
					break;
				}
			}
			fieldLabelContainerStyle[marginSide] = margin;
		}

		if (fieldComponent.labelWidth) {
			fieldLabelContainerStyle["width"] = fieldComponent.labelWidth;
		}

		if (fieldComponent.marginLeft) {
			fieldMainWrapperStyle["margin-left"] = fieldComponent.marginLeft;
		}

		if (fieldComponent.marginRight) {
			fieldMainWrapperStyle["margin-right"] = fieldComponent.marginRight;
		}

		if (fieldComponent.marginTop) {
			fieldMainWrapperStyle["margin-top"] = fieldComponent.marginTop;
		}

		if (fieldComponent.marginBottom) {
			fieldMainWrapperStyle["margin-bottom"] =
				fieldComponent.marginBottom;
		}

		let inlineStyle = {
			fieldMainWrapperStyle,
			fieldWrapperStyle: {},
			fieldTooltipWrapperStyle: {},
			fieldTooltipContainerStyle: {},
			fieldDescWrapperStyle: {},
			fieldDescContainerStyle: {},
			fieldLabelContainerStyle,
			fieldContainerdStyle: {},
			labelStyle: {},
			fieldStyle: {},
			nestedFieldContainerStyle: {}
		};
		inlineStyle = fieldComponent._beforeSetDefaultStyle(inlineStyle);
		return inlineStyle;
	}

	addDisplayProps(fieldComponent) {
		if (fieldComponent.type == "HID") {
			this.renderer.addClass(
				fieldComponent._elemRef.nativeElement,
				"hidden"
			);
		}
		this.renderer.addClass(
			fieldComponent._elemRef.nativeElement,
			"fe-field-component"
		);
	}

	addButtonProps(fieldComponent, classesObj?: any) {
		const buttonThemeClasses = this._defaults.BUTTON_THEMES;
		let themeClass = buttonThemeClasses[fieldComponent.theme];
		if (!classesObj) {
			classesObj = {};
			classesObj.fieldClasses = {};
		}
		if (!themeClass) {
			themeClass = buttonThemeClasses[this._defaults.BUTTON_THEME];
		}
		classesObj["fieldClasses"][themeClass] = true;
		const buttonSizeClasses = this._defaults.BUTTON_SIZES;

		if (fieldComponent.size) {
			classesObj["fieldClasses"][
				buttonSizeClasses[fieldComponent.size]
			] = true;
		} else {
			classesObj["fieldClasses"][
				buttonSizeClasses[this._defaults.BUTTON_SIZE]
			] = true;
		}
		classesObj["btnDefaultClasses"] = {};
		classesObj["btnDefaultClasses"]["display-flex"] = true;
		let btnAlignment = fieldComponent.labelAlignment;
		if (fieldComponent.labelAlignment) {
			btnAlignment = fieldComponent.labelAlignment;
		}

		if(btnAlignment) {
			classesObj["btnDefaultClasses"][`align-${btnAlignment}`] = true;
		}

		return classesObj;
	}

	createFormGroup(fb: FormBuilder, schemaControls, group?: FormGroup) {
		if (!fb) {
			console.log(`Can not create form group without form builder`);
			return;
		}

		if (!group) {
			group = fb.group({});
		}
		this.createControls(fb, group, schemaControls);
		return group;
	}

	createControls(fb: FormBuilder, group: FormGroup, schemaControls: any) {
		schemaControls.forEach(config => {
			if (config.type && config.type == "FST") {
				this.createControls(fb, group, config.components);
			} else {
				const control = this.createControl(fb, config);
				if (control) {
					group.addControl(config.flexiLabel, control);
				}
			}
		});
	}

	createControl(fb: FormBuilder, config: FieldConfig) {
		const { disabled, validation } = config;
		return fb.control({ disabled, value: undefined }, validation);
	}
}
