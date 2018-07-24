import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeDateTimeComponent } from './dateTime.component';

describe('FeDateTimeComponent', () => {
  let component: FeDateTimeComponent;
  let fixture: ComponentFixture<FeDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
