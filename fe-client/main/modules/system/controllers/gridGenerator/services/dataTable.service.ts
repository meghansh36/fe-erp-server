import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTable } from '@L1Modules/system/controllers/gridGenerator/models/data-table.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';

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
			{ icon: "md-get_app", clickEvent: "download", handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' },
		],
		columns: [
			{ prop: "FORM_CODE", name: "Form Code", sortable: true, resizeable: true, width: '300', frozenLeft: true },
			{ prop: "LABEL", name: "Label", sortable: true, resizeable: true, width: '400', align: 'left' },
		],
		rowActions: [
			{ icon: 'md-create', clickEvent: 'navigateToFormGenerator', handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' },
			{ icon: 'md-create', clickEvent: 'navigateToFormBuilder', handlerOwner: 'resource', customCssClass: 'gray_clr mr_10 pointer' }
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

	fetchRowData(object: any): Observable<HttpResponse<any>> {
		return this.http.post(
			'/api/fe/fe/default/forms_data/forms_data', object, { observe: 'response' });
	}

	/* fetchLimitData(object: any): Observable<HttpResponse<any>> {
		return this.http.post<any>('http://fe.localhost:3000/api/fe/fe/default/forms_data/forms_data', object, { observe: 'response' });
	}

	fetchNewDataAfterPaging(object: any): Observable<HttpResponse<any>> {
		return this.http.post<any>('http://fe.localhost:3000/api/fe/fe/default/forms_data/forms_data', object, { observe: 'response' });
	} */

	getGridDefinationByCode(code: string): Observable<HttpResponse<any>> {
		return this.http.get<any>(
			`https://raw.githubusercontent.com/Dhruv1996oct1/dodo_wisdom/master/col.json`, { observe: 'response' });
	}
}
