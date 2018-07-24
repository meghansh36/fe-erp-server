import { Component, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef, ComponentRef, ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { DataTableService } from '@L3Process/system/modules/gridGenerator/services/dataTable.service';
import { DependentFieldService } from '@L3Process/system/modules/gridGenerator/services/dependentField.service';
import { NgbModal, ModalDismissReasons, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
	selector: 'fe-chip',
	styleUrls: ['chip.component.css'],
	templateUrl: 'chip.component.html'
})
export class FeChipComponent implements OnInit {
	@Input() chipData: any;
	@Output() closeChip: EventEmitter<any> = new EventEmitter<any>();
	@Output() addThisFilter: EventEmitter<any> = new EventEmitter<any>();

	protected _chipData: any;
	protected _filteredCol: any;
	protected _checked: boolean = false;
	protected _obj: any;
	protected _dependentKeys: any;

	constructor(protected dependent: DependentFieldService) { }

	protected _beforeNgOnInit() { }
	protected _afterNgOnInit() { }

	ngOnInit() {
		this._init();
	}

	protected _init() {
		this._chipData = _.assign({}, this.chipData);
		this.checkForParent();
		this.addChild();
		this.obj = {
			name: this.label,
			filter: this.filter,
			filterValue: this.filterValue,
			operator: this.operator,
			code: this.code,
			type: this.type,
			label: this.label,
			lov: this.lov,
			flexiLabel: this.flexiLabel,
			dependentKeys: this.dependentKeys,
			parent: this.parent,
			child: this.child,
			columnsFiltersTobeApplied: this.columnsFiltersTobeApplied,
			labelIfParent: this.labelIfParent
		}
	}

	protected checkForParent() {
		if (this.parent) {
			this.name = this.labelIfParent;
		}
	}

	protected addChild() {
		if (this.child) {
			this.dependent.setLovCode(this.lov);
			this.dependent.storeValueOfChild(this.code, this.filter);
		}
	}

	protected popUp() {
		this._checked = !this._checked;
		this.filteredCol = this.chipData;
	}

	protected closePopUp() {
		this._checked = !this._checked;
	}

	protected addFilter(event: any) {
		this.filter = event.filter;
		this.operator = event.operator;
		this.dependentFilter = event.dependentFilter;
		this.dependentKeys = event.dependentKeys;
		this.filterValue = event.filterValue;

		this.obj['filter'] = this.filter;
		this.obj['dependentFilter'] = this.dependentFilter;
		this.obj['operator'] = this.operator;
		this.obj['dependentKeys'] = this.dependentKeys;
		this.obj['filterValue'] = this.filterValue;

		this.addThisFilter.emit(this.obj);
		this._checked = !this._checked;
	}

	protected removeChip() {
		this.chipData.filter = undefined;
		this.closeChip.emit(this.obj);
	}

	get filteredCol() {
		return this._filteredCol;
	}

	set filteredCol(filteredCol) {
		this._filteredCol = filteredCol;
	}

	get filter() {
		return this._chipData.filter;
	}

	set filter(filterString) {
		this._chipData.filter = filterString;
	}

	get dependentFilter() {
		return this._chipData.dependentFilter;
	}

	set dependentFilter(dependentFilter) {
		this._chipData.dependentFilter = dependentFilter;
	}

	get name() {
		return this._chipData.name;
	}

	set name(name) {
		this._chipData.name = name;
	}
	get label() {
		return this._chipData.label;
	}

	get code() {
		return this._chipData.code;
	}

	get type() {
		return this._chipData.type;
	}

	get flexiLabel() {
		return this._chipData.flexiLabel;
	}

	get lov() {
		if (this._chipData.lov) {
			return this._chipData.lov;
		}
	}
	get obj() {
		return this._obj;
	}

	set obj(obj) {
		this._obj = obj;
	}

	get operator() {
		return this._chipData.operator;
	}

	set operator(operator) {
		this._chipData.operator = operator;
	}

	get dependentFilters() {
		return this._chipData.dependentFilter;
	}


	set dependentFilters(depFil) {
		this._chipData.dependentFilter = depFil
	}

	get childMeaning() {
		return this._chipData.childMeaning;
	}

	set childMeaning(childMeaning) {
		this._chipData.childMeaning = childMeaning
	}

	get dependentKeys() {
		return this._chipData.dependentKeys;
	}

	set dependentKeys(dependentKeys) {
		this._chipData.dependentKeys = dependentKeys;
	}

	get filterValue() {
		return this._chipData.filterValue;
	}

	set filterValue(filterValue) {
		this._chipData.filterValue = filterValue;
	}

	get parent() {
		return this._chipData.parent;
	}

	get child() {
		return this._chipData.child;
	}

	get columnsFiltersTobeApplied() {
		return this._chipData.columnsFiltersTobeApplied
	}

	get labelIfParent() {
		return this._chipData.labelIfParent;
	}
}

