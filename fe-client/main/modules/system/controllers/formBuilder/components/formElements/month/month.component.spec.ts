import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeMonthComponent } from './month.component';

describe('FeMonthComponent', () => {
  let component: FeMonthComponent;
  let fixture: ComponentFixture<FeMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
