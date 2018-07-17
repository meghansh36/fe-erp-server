import { TestBed, inject } from '@angular/core/testing';

import { FeFieldControlService } from './fieldControl.service';

describe('FeFieldControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeFieldControlService]
    });
  });

  it('should be created', inject([FeFieldControlService], (service: FeFieldControlService) => {
    expect(service).toBeTruthy();
  }));
});
