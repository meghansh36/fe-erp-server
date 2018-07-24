import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter, TemplateRef, Renderer2 } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DataTableService } from '@L3Process/system/modules/gridGenerator/services/dataTable.service';
import { FilteredDataService } from '@L3Process/system/modules/gridGenerator/services/filteredData.service';
import { DependentFieldService } from '@L3Process/system/modules/gridGenerator/services/dependentField.service';
import { DataTable } from '@L1Process/system/modules/gridGenerator/models/data-table.interface';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
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

	protected temp = [];
	protected allColumns = [];
	protected openOrClose: boolean = true;
	protected _formCode: string;
	protected _pageHide: boolean;
	protected _limitShow: boolean;
	protected selected = [];
	protected _checkboxable: boolean;
	protected _headerCheckboxable: boolean;
	protected _filterable: boolean;
	protected _editableIcon: boolean;
	protected _message: string;
	protected _rows: any;
	protected _limit: any;
	protected _columns: any;
	protected _rowHeight: any;
	protected _scrollbarH: any;
	protected _offset: any;
	protected _headerHeight: any;
	protected _footerHeight: any;
	protected _rowActions: any;
	protected _buttons: any;
	protected _actionButtons: any;
	protected _title: string;
	protected _subTitle: string;
	protected _filterableCol = [];
	protected _initialValue: string;
	protected _columnsFiltersTobeApplied = [];
	protected checked: boolean = false;
	protected _filteredCol: any;
	protected _filterJsonData = [];
	protected _sortedData = [];
	protected _currentDependentNotInNext: any;
	protected allColumnsForFilter: any;

	get rows() {
		return this._rows;
	}

	set rows(rows) {
		this._rows = rows;
	}

	get formCode() {
		return this._formCode;
	}

	set formCode(formCode) {
		this._formCode = formCode;
	}

	get limit() {
		return this.table.limit;
	}

	set limit(limit) {
		this.table.limit = limit;
	}

	get columns() {
		return this._columns;
	}

	set columns(column) {
		this._columns = column;
	}

	get rowHeight() {
		return this._rowHeight;
	}

	set rowHeight(rowHeight) {
		this._rowHeight = rowHeight;
	}

	get scrollbarH() {
		return this._scrollbarH;
	}

	set scrollbarH(scrollbarH) {
		this._scrollbarH = scrollbarH;
	}

	get headerHeight() {
		return this._headerHeight;
	}

	set headerHeight(headerHeight) {
		this._headerHeight = headerHeight
	}

	get offset() {
		return this._offset;
	}

	set offset(offset) {
		this._offset = offset;
	}

	get footerHeight() {
		return this._footerHeight;
	}

	set footerHeight(footerHeight) {
		this._footerHeight = footerHeight;
	}

	get pager() {
		return this._pageHide;
	}

	set pager(pager) {
		this._pageHide = pager;
	}

	get limitShow() {
		return this._limitShow;
	}

	set limitShow(limitShow) {
		this._limitShow = limitShow;
	}

	get pagerShowHideCondition() {
		if (((this.table.rowCount / this.table.pageSize) > 1) && this.pager) {
			return false;
		}
		else return true;
	}

	get selectionType() {
		return this.table.selectionType;
	}

	set selectionType(selectionType) {
		this.table.selectionType = selectionType;
	}

	get selectAllRowsOnPage() {
		return this.table.selectAllRowsOnPage;
	}

	set selectAllRowsOnPage(selectAllRowsOnPage) {
		this.table.selectAllRowsOnPage = selectAllRowsOnPage;
	}

	get checkboxable() {
		return this._checkboxable;
	}

	set checkboxable(checkboxable) {
		this._checkboxable = checkboxable
	}

	get headerCheckboxable() {
		return this._headerCheckboxable;
	}

	set headerCheckboxable(headerCheckboxable) {
		this._headerCheckboxable = headerCheckboxable;
	}

	get filterable() {
		return this._filterable;
	}

	set filterable(filterable) {
		this._filterable = filterable;
	}

	get editableIcon() {
		return this._editableIcon;
	}

	set editableIcon(editableIcon) {
		this._editableIcon = editableIcon;
	}

	get message() {
		return this._message;
	}

	set message(message) {
		this._message = message;
	}

	get rowActions() {
		return this._rowActions;
	}

	set rowActions(rowActions) {
		this._rowActions = rowActions;
	}

	get actionButtons() {
		return this._actionButtons;
	}

	set actionButtons(actionButtons) {
		this._actionButtons = actionButtons;
	}

	get buttons() {
		return this._buttons;
	}

	set buttons(buttons) {
		this._buttons = buttons;
	}

	get title() {
		return this._title;
	}

	set title(title) {
		this._title = title;
	}

	get subTitle() {
		return this._subTitle;
	}

	set subTitle(subTitle) {
		this._subTitle = subTitle;
	}

	get filteredCol() {
		return this._filteredCol;
	}

	set filteredCol(filteredCol) {
		this._filteredCol = filteredCol;
	}

	get filterableCol() {
		return this._filterableCol;
	}

	set filterableCol(filterableCol) {
		this._filterableCol = filterableCol;
	}

	get columnsFiltersTobeApplied() {
		return this._columnsFiltersTobeApplied
	}

	get InitialValue() {
		return this._initialValue;
	}

	set InitialValue(InitialValue) {
		this._initialValue = InitialValue;
	}

	set columnsFiltersTobeApplied(columnsFiltersTobeApplied) {
		this._columnsFiltersTobeApplied = columnsFiltersTobeApplied;
	}

	get filterJsonData() {
		return this._filterJsonData;
	}

	set filterJsonData(filterJsonData) {
		this._filterJsonData = filterJsonData;
	}

	get sortedData() {
		return this._sortedData;
	}

	set sortedData(sortedData) {
		this._sortedData = sortedData;
	}

	constructor(protected dataTableService: DataTableService,
		protected modalService: NgbModal,
		protected config: NgbDropdownConfig,
		protected filterService: FilteredDataService,
		protected dependent: DependentFieldService) {
		config.autoClose = false;
	}

	ngOnInit() {
		let gridData = this.dataTableService.getColumn();
		this.setGrid(gridData);
		let rowData = this.dataTableService.fetch();
		this.setRows(rowData);
	}

	setGrid(gridData) {
		for (var key in gridData) {
			if (key == 'formCode') {
				this.formCode = gridData[key];
			}
			if (key == 'columns') {
				this.columns = this.allColumns = gridData[key];
			}
			if (key == 'limit') {
				this.limit = gridData[key];
			}
			if (key == 'footerHeight') {
				this.footerHeight = gridData[key];
			}
			if (key == 'offset') {
				this.offset = gridData[key];
			}
			if (key == 'headerHeight') {
				this.headerHeight = gridData[key];
			}
			if (key == 'scrollbarH') {
				this.scrollbarH = gridData[key];
			}
			if (key == 'rowHeight') {
				this.rowHeight = gridData[key];
			}
			if (key == 'pager') {
				this.pager = gridData[key];
			}
			if (key == 'limitShow') {
				this.limitShow = gridData[key];
			}
			if (key == 'selectionType') {
				this.selectionType = gridData[key];
			}
			if (key == 'selectAllRowsOnPage') {
				this.selectAllRowsOnPage = gridData[key];
			}
			if (key == 'checkboxable') {
				this.checkboxable = gridData[key];
			}
			if (key == 'headerCheckboxable') {
				this.headerCheckboxable = gridData[key];
			}
			if (key == 'filterable') {
				this.filterable = gridData[key];
			}
			if (key == 'editableIcon') {
				this.editableIcon = gridData[key];
			}
			if (key == 'message') {
				this.message = gridData[key];
			}
			if (key == 'rowActions') {
				this.rowActions = gridData[key];
			}
			if (key == 'actionButtons') {
				this.actionButtons = gridData[key];
			}
			if (key == 'buttons') {
				this.buttons = gridData[key];
			}
			if (key == 'title') {
				this.title = gridData[key];
			}
			if (key == 'subTitle') {
				this.subTitle = gridData[key];
			}
			if (key == 'applicableFilters') {
				this.columnsFiltersTobeApplied = gridData[key];
			}
		}
	}

	setRows(rowData: Observable<DataTable[]>) {
		rowData.subscribe((ele: DataTable[]) => {
			this.rows = [...ele];
			this.temp = [...ele];
		});
	}

	toggle(col) {
		const isChecked = this.isChecked(col);

		if (isChecked) {
			this.columns = this.columns.filter(c => {
				return c.name !== col.name;
			});
		} else {
			this.columns = [...this.columns, col];
		}
	}

	isChecked(col) {
		return this.columns.find(c => {
			return c.name === col.name;
		});
	}

	openModal(content) {
		this.modalService.open(content, { centered: true });
	}

	getLimitedData(event) {
		let limit = event.target.value;
		let pageNumber = this.table.offset;
		let prevLimit = this.limit;
		this.dataTableService.fetchLimitData(limit, pageNumber, prevLimit);
	}

	onSelect({ selected }) {
		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
	}

	add() {
		this.selected.push(this.rows[1], this.rows[3]);
	}

	update() {
		this.selected = [this.rows[1], this.rows[3]];
	}

	remove() {
		this.selected = [];
	}
	//----------------------buttons actions ----------------------------
	dropDownOpenClose() {
		if (this.openOrClose) {
			this.dropdown.open();
			this.openOrClose = !this.openOrClose;
		}
		else {
			this.dropdown.close();
			this.openOrClose = !this.openOrClose;
		}
	}

	onAction(action: any, arg: any) {
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

	popUp(col: any) {
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

	closePopUp(event: any) {
		this.checked = event;
	}

	closeThisChip(event: any) {
		let code = event.code;
		event.filter = undefined;
		let element = document.querySelector(`#chip${code}`);
		this.filterableCol = this.filterableCol.filter((ele) => ele.code != code);
		element.remove();
		this.enableElement(event);
		this.manipulateStructureOfFilter(event);
	}

	addFirstFilter(event: any) {
		this.filterableCol.push(event);
		this.checked = event.checked;
		this.manipulateStructureOfFilter(event);

		let element = document.querySelector(`#btn${event.code}`);
		element.setAttribute('disabled', 'true');
		if (event.parent) {
			let field = document.querySelector(`#btn${event.parent}`);
			field.setAttribute('disabled', 'true');
		}
	}

	applyModifiedFilter(event: any) {
		this.manipulateStructureOfFilter(event);
	}

	manipulateStructureOfFilter(event: any) {
		this.convertToValidFilterJson(event);
		this.checkIfParentHasChild(event);
		this.applyFilter();
	}


	convertToValidFilterJson(filter: any) {
		this.removePrevSameValues(filter);
		if (filter.filter != undefined) {
			let getObj = this.valuesOfFilter(filter);
			getObj.forEach((ele) => {
				this.filterJsonData.push(ele);
			})
		}
	}

	removePrevSameValues(filter: any) {
		this.filterJsonData = this.filterJsonData.filter((ele) => Object.keys(ele) != filter.flexiLabel);
		if (filter.dependentKeys.length) {
			filter.dependentKeys.forEach((flt) => {
				this.filterJsonData = this.filterJsonData.filter((ele) => Object.keys(ele) != flt);
			})
		}
	}

	valuesOfFilter(filter: any) {
		let obj = [];
		if (filter.filter) {
			let flt = {
				[filter.flexiLabel]: {
					operator: filter.operator,
					value: this.filterByType(filter)
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

	filterByType(filter: any) {
		if (filter.type == "SEL") {
			console.log(filter);
			return filter.filterValue;
		}
		return filter.filter;
	}

	checkIfParentHasChild(event: any) {
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



	enableElement(event: any) {
		let field = document.querySelector(`#btn${event.code}`);
		field.removeAttribute('disabled');
		if (event.parent) {
			let parent = document.querySelector(`#btn${event.parent}`);
			parent.removeAttribute('disabled');
		}
	}

	//-------------------------- *********** ---------------------------------

	//-------------------------- sorting filter ------------------------------

	filterOnSorting({ sorts, column, prevValue, newValue }) {
		this.convertToValidSortingJson(sorts);
		this.applyFilter();
	}

	convertToValidSortingJson(sorts: any) {
		this.sortedData = this.sortedData.filter((ele) => ele.flexiLabel != sorts[0].prop);
		let obj = {
			flexiLabel: sorts[0].prop, type: sorts[0].dir
		}
		this.sortedData.push(obj);
	}


	//-------------------------- *********** ---------------------------------

	applyFilter() {
		let obj = {
			page: this.table.offset,
			recordsPerPage: this.limit,
			filters: this.filterJsonData,
			formCode: this.formCode,
			sorting: this.sortedData
		}
		this.filterService.sendFilterOption(obj);
	}


	reorderColumn({ column, newValue, prevValue }: any): void {
		if (column.frozenLeft) {
			return;
		}
	}

}
