import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeFileComponent } from './file.component';

describe('FeFileComponent', () => {
  let component: FeFileComponent;
  let fixture: ComponentFixture<FeFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
