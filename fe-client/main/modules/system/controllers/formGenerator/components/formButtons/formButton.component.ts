import {
	Component,
	Input,
	OnInit,
	ElementRef,
	Renderer2,
	AfterViewInit
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UtilityService } from "@L3Modules/system/services/utility.service";

@Component({
	selector: "feFormButton",
	styleUrls: ["formButton.component.css"],
	templateUrl: "formButton.component.html"
})
export class FeFormButtonsComponent implements OnInit, AfterViewInit {
	@Input() buttonConfig: any;
	@Input() group: FormGroup;
	@Input() form: any;

	protected _defaultClasses : any;

	constructor(
		public elemRef: ElementRef,
		public render: Renderer2,
		public utilityService: UtilityService
	) {}

	get label() {
		return this.buttonConfig.label;
	}

	get id() {
		return this.buttonConfig.id;
	}

	get icon() {
		return this.buttonConfig.icon;
	}

	get events() {
		return this.buttonConfig.events;
	}

	get fieldRef() {
		return document.querySelector(`#${this.id}`);
	}

	get size() {
		return this.buttonConfig.size;
	}

	get theme() {
		return this.buttonConfig.theme;
	}

	set size(size) {
		this.buttonConfig.size = size;
	}

	set theme(theme) {
		this.buttonConfig.size = theme;
	}

	get defaultClasses() {
		return this._defaultClasses;
	}

	set defaultClasses(defaultClasses) {
		this._defaultClasses = defaultClasses;
	}

	get btnRightIcon() {
		return this.buttonConfig.btnRightIcon;
	}

	set btnRightIcon(btnRightIcon) {
		this.buttonConfig.btnRightIcon = btnRightIcon;
	}

	get btnLeftIcon() {
		return this.buttonConfig.btnLeftIcon;
	}

	set btnLeftIcon(btnLeftIcon) {
		this.buttonConfig.btnLeftIcon = btnLeftIcon;
	}

	ngOnInit() {
		this.defaultClasses = this.utilityService.addButtonProps( this, {} );
	}

	ngAfterViewInit() {
		this.bindEvents();
	}

	bindEvents() {
		try {
			const eventsObjArr: object = this.events;
			if (eventsObjArr) {
				const field = this.fieldRef;
				for (let eventName in eventsObjArr) {
					console.log(field);
					this.render.listen(
						field,
						eventName,
						this.utilityService.fieldEventHandler.bind(
							this.utilityService,
							eventName,
							eventsObjArr[eventName],
							this
						)
					);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
}
