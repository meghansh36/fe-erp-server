import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTable } from '@L1Process/system/modules/gridGenerator/models/data-table.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FeDataTableService {

	constructor(private http: HttpClient) { }

	private data: any;
	private handleError: ErrorHandler;

	private column = {
		formCode: "FRM0001001",
		rowHeight: "100",
		scrollbarH: true,
		headerHeight: "50",
		limit: "3",
		offset: "0",
		footerHeight: '50',
		pager: true,
		limitShow: true,
		selectionType: "checkbox",
		selectAllRowsOnPage: false,
		checkboxable: true,
		headerCheckboxable: true,
		filterable: true,
		editableIcon: true,
		title: "Users",
		exportToExcel: 'Y',
		subTitle: "Showing all users",
		message: {
			emptyMessage: "No Data to Show"
		},
		buttons: [
			{ icon: "md-get_app", clickEvent: "download",handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' },
		],
		columns: [
			{ prop: "FORM_CODE", name: "Form Code", sortable: true, resizeable: true, width: '300', frozenLeft: true },
			{ prop: "LABEL", name: "Label", sortable: true, resizeable: true, width: '400', align: 'left' },
		],
		rowActions: [
			{ icon: 'md-create', clickEvent: 'getFormById', handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' },
		],
		actionButtons: [
			{ icon: 'md-email', clickEvent: 'sendMail', handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' },
			{ icon: 'md-person_add', clickEvent: 'addPerson', handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' }
		],
		applicableFilters: [
			{
				type: "TXT", code: "FLD0001001", flexiLabel: "FORM_CODE", label: "Form Code"
			},
			{
				type: "TXT", code: "FLD0001002", flexiLabel: "LABEL", label: "Label"
			}/* ,
			{
				type: "SEL", code: "FLD0001004", flexiLabel: "state", parent:'FLD0001005', label: "State", lov: [{
					'code': 'DEL',
					'meaning': 'Delhi',
					'tip': 'Delhi',
				}, {
					'code': 'FLO',
					'meaning': 'Florida',
					'tip': 'Florida'
				}],
				isParent: 'Y',
				children: []
			},
			{
				type: "SEL", code: "FLD0001005", flexiLabel: "country", child:'FLD0001004', label: "Country", lov: [{
					'code': 'IND',
					'meaning': 'India',
					'tip': 'India',
				}, {
					'code': 'USA',
					'meaning': 'USA',
					'tip': 'USA'
				}],
				children: []
			} */
		]
	}

	fetch() {
		return this.http.get('https://raw.githubusercontent.com/Dhruv1996oct1/dodo_wisdom/2d04497a24d555486e992cf2f6dfdf7ac6db15c7/data.json')
			.pipe(
				map(data => data['key'])
			);
	}

	fetchLimitData(limit, pageNumber, prevLimit) {
		this.http.post('/api/fetchLimitData', { 'limit': limit, 'pageNumber': pageNumber, 'prevLimit': prevLimit }).subscribe((res) => {
			console.log(res);
		}, (err) => {
			console.log(err);
		})
	}

	getColumn() {
		return this.column;
	}
}
