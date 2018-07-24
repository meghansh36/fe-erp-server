import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter, TemplateRef, Renderer2 } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DataTableService } from '@L3Process/system/modules/gridGenerator/services/dataTable.service';
import { FilteredDataService } from '@L3Process/system/modules/gridGenerator/services/filteredData.service';
import { DependentFieldService } from '@L3Process/system/modules/gridGenerator/services/dependentField.service';
import { DataTable } from '@L1Process/system/modules/gridGenerator/models/data-table.interface';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
import { NgbModal, ModalDismissReasons, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'fe-dataTable',
	styleUrls: ['dataTable.component.css'],
	templateUrl: 'dataTable.component.html',
	encapsulation: ViewEncapsulation.None
})
export class FeDataTableComponent implements OnInit {
	@Input() formInstance: any;
	@Input() code: string;
	@Output() reorder = new EventEmitter;
	@ViewChild('dropdown') dropdown: any;
	@ViewChild('myDrop') myDrop: any;
	@ViewChild('nameSummaryCell') nameSummaryCell: TemplateRef<any>;
	@ViewChild(DatatableComponent) table: DatatableComponent;

	protected _gridDef = {};
	protected temp = [];
	protected allColumns = [];
	protected selected = [];
	protected _filterJsonData = [];
	protected openOrClose: boolean = true;
	protected checked: boolean = false;
	protected allColumnsForFilter: any;

	constructor(protected dataTableService: DataTableService,
		protected modalService: NgbModal,
		protected config: NgbDropdownConfig,
		protected filterService: FilteredDataService,
		protected dependent: DependentFieldService) {
		config.autoClose = false;
	}

	protected _beforeNgOnInit() { }
	protected _afterNgOnInit() { }

	ngOnInit() {
		this._beforeNgOnInit();
		this._init();
		this._afterNgOnInit();
	}

	protected _init() {
		this.dataTableService.getGridDefinationByCode(this.code).subscribe((data) => {
			this._setGridData(data);
		})
	}

	protected _setGridData(data) {
		let gridDefination = _.assign({}, { ...data.body.data });
		try {
			if (gridDefination) {
				this._initializeGrid(gridDefination);
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	protected _initializeGrid(gridDefination) {
		this._setGrid(gridDefination);
		this.dataTableService.fetchRowData().subscribe((data) => {
			this._setRowData(data);
		})
	}

	protected _setGrid(gridDefination) {
		this._gridDef = _.assign({}, gridDefination);
	}

	protected _setRowData(data) {
		this.rows = [...data.body.data];
		this.temp = [...data.body.data];
	}

	protected _toggle(col) {
		const isChecked = this._isChecked(col);

		if (isChecked) {
			this.columns = this.columns.filter(c => {
				return c.name !== col.name;
			});
		} else {
			this.columns = [...this.columns, col];
		}
	}

	protected _isChecked(col) {
		return this.columns.find(c => {
			return c.name === col.name;
		});
	}

	protected _openModal(content) {
		this.modalService.open(content, { centered: true });
	}

	protected _getLimitedData(event) {
		let limit = event.target.value;
		let pageNumber = this.table.offset;
		let prevLimit = this.limit;
		this.dataTableService.fetchLimitData(limit, pageNumber, prevLimit);
	}

	protected _onSelect({ selected }) {
		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
	}

	protected _add() {
		this.selected.push(this.rows[1], this.rows[3]);
	}

	protected _update() {
		this.selected = [this.rows[1], this.rows[3]];
	}

	protected _remove() {
		this.selected = [];
	}
	//----------------------buttons actions ----------------------------
	protected _dropDownOpenClose() {
		if (this.openOrClose) {
			this.dropdown.open();
			this.openOrClose = !this.openOrClose;
		}
		else {
			this.dropdown.close();
			this.openOrClose = !this.openOrClose;
		}
	}

	protected _onAction(action: any, arg: any) {
		try {
			if (action.handlerOwner == 'form') {
				if (this.formInstance.formInstance[action.clickEvent]) {
					this.formInstance.formInstance[action.clickEvent](arg);
				}
			}
			if (action.handlerOwner == 'resource') {
				if (this.formInstance[action.clickEvent]) {
					this.formInstance[action.clickEvent](arg);
				}
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	//----------------------***************** ----------------------------

	//-------------------------- Filters ---------------------------------

	protected _popUp(col: any) {
		this.checked = !this.checked;
		this.filteredCol = col;
		this.allColumnsForFilter = this.columnsFiltersTobeApplied;
		if (col.type == "TXT") {
			this.InitialValue = 'filter';
		}
		if (col.type == "SEL") {
			this.InitialValue = " ";
		}
		this.myDrop.close();
	}

	protected _closePopUp(event: any) {
		this.checked = event;
	}

	protected _closeThisChip(event: any) {
		let code = event.code;
		event.filter = undefined;
		let element = document.querySelector(`#chip${code}`);
		this.filterableCol = this.filterableCol.filter((ele) => ele.code != code);
		element.remove();
		this._enableElement(event);
		this._manipulateStructureOfFilter(event);
	}

	protected _addFirstFilter(event: any) {
		this.filterableCol.push(event);
		this.checked = event.checked;
		this._manipulateStructureOfFilter(event);

		let element = document.querySelector(`#btn${event.code}`);
		element.setAttribute('disabled', 'true');
		if (event.parent) {
			let field = document.querySelector(`#btn${event.parent}`);
			field.setAttribute('disabled', 'true');
		}
	}

	public applyModifiedFilter(event: any) {
		this._manipulateStructureOfFilter(event);
	}

	protected _manipulateStructureOfFilter(event: any) {
		this._convertToValidFilterJson(event);
		this._checkIfParentHasChild(event);
		this._applyFilter();
	}


	protected _convertToValidFilterJson(filter: any) {
		this._removePrevSameValues(filter);
		if (filter.filter != undefined) {
			let getObj = this._valuesOfFilter(filter);
			getObj.forEach((ele) => {
				this.filterJsonData = ele;
			})
		}
	}

	protected _removePrevSameValues(filter: any) {
		this.filterJsonData = this.filterJsonData.filter((ele) => Object.keys(ele) != filter.flexiLabel);
		if (filter.dependentKeys.length) {
			filter.dependentKeys.forEach((flt) => {
				this.filterJsonData = this.filterJsonData.filter((ele) => Object.keys(ele) != flt);
			})
		}
	}

	protected _valuesOfFilter(filter: any) {
		let obj = [];
		if (filter.filter) {
			let flt = {
				[filter.flexiLabel]: {
					operator: filter.operator,
					value: this._filterByType(filter)
				}
			}
			obj.push(flt);
		}
		if (filter.dependentFilter.length > 0) {
			filter.dependentFilter.forEach((flt) => {
				let temp = {
					[flt.flexi]: {
						operator: flt.operator,
						value: flt.value
					}
				}
				obj.push(temp);
			})
		}
		return obj;
	}

	protected _filterByType(filter: any) {
		if (filter.type == "SEL") {
			console.log(filter);
			return filter.filterValue;
		}
		return filter.filter;
	}

	protected _checkIfParentHasChild(event: any) {
		if (event.parent) {
			let val = event.parent;
			let temp = this.dependent.getChildCode(val);
			if (temp) {
				if (document.querySelector(`#CHIP_${temp.code}`)) {
					let chip = document.querySelector(`#CHIP_${temp.code}`);
					if (chip != null) {
						chip.remove();
					}
				}
			}
		}
	}



	protected _enableElement(event: any) {
		let field = document.querySelector(`#btn${event.code}`);
		field.removeAttribute('disabled');
		if (event.parent) {
			let parent = document.querySelector(`#btn${event.parent}`);
			parent.removeAttribute('disabled');
		}
	}

	//-------------------------- *********** ---------------------------------

	//-------------------------- sorting filter ------------------------------

	protected _filterOnSorting({ sorts, column, prevValue, newValue }) {
		this._convertToValidSortingJson(sorts);
		this._applyFilter();
	}

	protected _convertToValidSortingJson(sorts: any) {
		this.sortedData = this.sortedData.filter((ele) => ele.flexiLabel != sorts[0].prop);
		let obj = {
			flexiLabel: sorts[0].prop, type: sorts[0].dir
		}
		this.sortedData.push(obj);
	}


	//-------------------------- *********** ---------------------------------

	protected _applyFilter() {
		let obj = {
			page: this.table.offset,
			recordsPerPage: this.limit,
			filters: this.filterJsonData,
			formCode: this.formCode,
			sorting: this.sortedData
		}
		this.filterService.sendFilterOption(obj);
	}


	public reorderColumn({ column, newValue, prevValue }: any): void {
		if (column.frozenLeft) {
			return;
		}
	}

	get rows() {
		return this._gridDef['rows'];
	}

	set rows(rows) {
		this._gridDef['rows'] = rows;
	}

	get formCode() {
		return this._gridDef['formCode'];
	}

	set formCode(formCode) {
		this._gridDef['formCode'] = formCode;
	}

	get limit() {
		return this._gridDef['limit'];
	}

	set limit(limit) {
		this._gridDef['limit'] = limit;
	}

	get columns() {
		return this._gridDef['columns'];
	}

	set columns(column) {
		this._gridDef['columns'] = column;
	}

	get rowHeight() {
		return this._gridDef['rowHeight'];
	}

	set rowHeight(rowHeight) {
		this._gridDef['rowHeight'] = rowHeight;
	}

	get scrollbarH() {
		return this._gridDef['scrollbarH'];
	}

	set scrollbarH(scrollbarH) {
		this._gridDef['scrollbarH'] = scrollbarH;
	}

	get headerHeight() {
		return this._gridDef['headerHeight'];
	}

	set headerHeight(headerHeight) {
		this._gridDef['headerHeight'] = headerHeight
	}

	get offset() {
		return this._gridDef['offset'];
	}

	set offset(offset) {
		this._gridDef['offset'] = offset;
	}

	get footerHeight() {
		return this._gridDef['footerHeight'];
	}

	set footerHeight(footerHeight) {
		this._gridDef['footerHeight'] = footerHeight;
	}

	get pager() {
		return this._gridDef['pager'];
	}

	set pager(pager) {
		this._gridDef['pager'] = pager;
	}

	get limitShow() {
		return this._gridDef['limitShow'];
	}

	set limitShow(limitShow) {
		this._gridDef['limitShow'] = limitShow;
	}

	get pagerShowHideCondition() {
		if (((this.table.rowCount / this.table.pageSize) > 1) && this.pager) {
			return false;
		}
		else return true;
	}

	get selectionType() {
		return this._gridDef['selectionType'];
	}

	set selectionType(selectionType) {
		this._gridDef['selectionType'] = selectionType;
	}

	get selectAllRowsOnPage() {
		return this._gridDef['selectAllRowsOnPage'];
	}

	set selectAllRowsOnPage(selectAllRowsOnPage) {
		this._gridDef['selectAllRowsOnPage'] = selectAllRowsOnPage;
	}

	get checkboxable() {
		return this._gridDef['checkboxable'];
	}

	set checkboxable(checkboxable) {
		this._gridDef['checkboxable'] = checkboxable
	}

	get headerCheckboxable() {
		return this._gridDef['headerCheckboxable'];
	}

	set headerCheckboxable(headerCheckboxable) {
		this._gridDef['headerCheckboxable'] = headerCheckboxable;
	}

	get filterable() {
		return this._gridDef['filterable'];
	}

	set filterable(filterable) {
		this._gridDef['filterable'] = filterable;
	}

	get editableIcon() {
		return this._gridDef['editableIcon'];
	}

	set editableIcon(editableIcon) {
		this._gridDef['editableIcon'] = editableIcon;
	}

	get message() {
		return this._gridDef['message'];
	}

	set message(message) {
		this._gridDef['message'] = message;
	}

	get rowActions() {
		return this._gridDef['rowActions'];
	}

	set rowActions(rowActions) {
		this._gridDef['rowActions'] = rowActions;
	}

	get actionButtons() {
		return this._gridDef['actionButtons'];
	}

	set actionButtons(actionButtons) {
		this._gridDef['actionButtons'] = actionButtons;
	}

	get buttons() {
		return this._gridDef['buttons'];
	}

	set buttons(buttons) {
		this._gridDef['buttons'] = buttons;
	}

	get title() {
		return this._gridDef['title'];
	}

	set title(title) {
		this._gridDef['title'] = title;
	}

	get subTitle() {
		return this._gridDef['subTitles'];
	}

	set subTitle(subTitle) {
		this._gridDef['subTitles'] = subTitle;
	}

	get filteredCol() {
		return this._gridDef['filteredCol'];
	}

	set filteredCol(filteredCol) {
		this._gridDef['filteredCol'] = filteredCol;
	}

	get filterableCol() {
		return this._gridDef['filterableCol'];
	}

	set filterableCol(filterableCol) {
		this._gridDef['filterableCol'] = filterableCol;
	}

	get columnsFiltersTobeApplied() {
		return this._gridDef['columnsFiltersTobeApplied']
	}
	set columnsFiltersTobeApplied(columnsFiltersTobeApplied) {
		this._gridDef['columnsFiltersTobeApplied'] = columnsFiltersTobeApplied;
	}

	get InitialValue() {
		return this._gridDef['InitialValue'];
	}

	set InitialValue(InitialValue) {
		this._gridDef['InitialValue'] = InitialValue;
	}


	get filterJsonData() {
		return this._filterJsonData;
	}

	set filterJsonData(filterJsonData) {
		this._filterJsonData.push(filterJsonData);
	}

	get sortedData() {
		return this._gridDef['sortedData'];
	}

	set sortedData(sortedData) {
		this._gridDef['sortedData'] = sortedData;
	}

}
