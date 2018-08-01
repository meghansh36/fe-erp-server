import { TestBed, inject } from '@angular/core/testing';

import { FormMasterService } from './form-master.service';

describe('FormMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormMasterService]
    });
  });

  it('should be created', inject([FormMasterService], (service: FormMasterService) => {
    expect(service).toBeTruthy();
  }));
});
