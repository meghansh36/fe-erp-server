import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient , HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FeFilteredDataService {

    constructor(private http: HttpClient) { }

    sendFilterOption(object: any): Observable<HttpResponse<any>> {
        return this.http.post(
			'/api/fe/fe/default/forms_data/forms_data', object, { observe: 'response' });
    }

}
