import { Component, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef, ComponentRef, ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { DataTableService } from '@L3Process/system/modules/gridGenerator/services/dataTable.service';
import { DependentFieldService } from '@L3Process/system/modules/gridGenerator/services/dependentField.service';
import { NgbModal, ModalDismissReasons, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'fe-chip',
	styleUrls: ['chip.component.css'],
	templateUrl: 'chip.component.html'
})
export class FeChipComponent implements OnInit {
	@Input() chipData: any;
	@Output() closeChip: EventEmitter<any> = new EventEmitter<any>();
	@Output() addThisFilter: EventEmitter<any> = new EventEmitter<any>();
	protected _filteredCol: any;
	protected checked: boolean = false;
	protected _obj: any;
	protected _dependentKeys: any;

	get filteredCol() {
		return this._filteredCol;
	}

	set filteredCol(filteredCol) {
		this._filteredCol = filteredCol;
	}

	get filter() {
		return this.chipData.filter;
	}

	set filter(filterString) {
		this.chipData.filter = filterString;
	}

	get dependentFilter() {
		return this.chipData.dependentFilter;
	}

	set dependentFilter(dependentFilter) {
		this.chipData.dependentFilter = dependentFilter;
	}

	get name() {
		return this.chipData.name;
	}

	set name(name) {
		this.chipData.name = name;
	}
	get label() {
		return this.chipData.label;
	}

	get code() {
		return this.chipData.code;
	}

	get type() {
		return this.chipData.type;
	}

	get flexiLabel() {
		return this.chipData.flexiLabel;
	}

	get lov() {
		if (this.chipData.lov) {
			return this.chipData.lov;
		}
	}
	get obj() {
		return this._obj;
	}

	set obj(obj) {
		this._obj = obj;
	}

	get operator() {
		return this.chipData.operator;
	}

	set operator(operator) {
		this.chipData.operator = operator;
	}

	get dependentFilters() {
		return this.chipData.dependentFilter;
	}


	set dependentFilters(depFil) {
		this.chipData.dependentFilter = depFil
	}

	get childMeaning() {
		return this.chipData.childMeaning;
	}

	set childMeaning(childMeaning) {
		this.chipData.childMeaning = childMeaning
	}

	get dependentKeys() {
		return this.chipData.dependentKeys;
	}

	set dependentKeys(dependentKeys) {
		this.chipData.dependentKeys = dependentKeys;
	}

	get filterValue() {
		return this.chipData.filterValue;
	}

	set filterValue(filterValue) {
		this.chipData.filterValue = filterValue;
	}

	get parent() {
		return this.chipData.parent;
	}

	get child() {
		return this.chipData.child;
	}

	get columnsFiltersTobeApplied() {
		return this.chipData.columnsFiltersTobeApplied
	}

	get labelIfParent() {
		return this.chipData.labelIfParent;
	}

	constructor(protected dependent: DependentFieldService) { }

	ngOnInit() {
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

	checkForParent() {
		if (this.parent) {
			this.name = this.labelIfParent;
		}
	}

	addChild() {
		if (this.child) {
			this.dependent.setLovCode(this.lov);
			this.dependent.storeValueOfChild(this.code, this.filter);
		}
	}

	popUp() {
		this.checked = !this.checked;
		this.filteredCol = this.chipData;
	}
	closePopUp() {
		this.checked = !this.checked;
	}
	addFilter(event: any) {
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
		this.checked = !this.checked;
	}
	removeChip() {
		this.chipData.filter = undefined;
		this.closeChip.emit(this.obj);
	}
}

