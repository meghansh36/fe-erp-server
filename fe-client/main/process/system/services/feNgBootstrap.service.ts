import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class FeNgBootstrapService {
    constructor( private _modal:  NgbModal ) {}

    openModal( content, options ): NgbModalRef {
       return this._modal.open( content, options );
    }

    closeModal( modalRef: NgbModalRef ) {
        modalRef.close();
    }
}