import { TestBed, inject } from '@angular/core/testing';

import { FeFormBuilderService } from './formBuilder.service';

describe('FormBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeFormBuilderService]
    });
  });

  it('should be created', inject([FeFormBuilderService], (service: FeFormBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
