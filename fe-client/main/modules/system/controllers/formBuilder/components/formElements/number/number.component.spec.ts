import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeNumberComponent } from './number.component';

describe('FeNumberComponent', () => {
  let component: FeNumberComponent;
  let fixture: ComponentFixture<FeNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
