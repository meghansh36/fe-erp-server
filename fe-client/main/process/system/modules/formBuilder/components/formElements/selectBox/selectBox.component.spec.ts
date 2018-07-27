import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeSelectBoxComponent } from './select-boxes.component';

describe('FeSelectBoxComponent', () => {
  let component: FeSelectBoxComponent;
  let fixture: ComponentFixture<FeSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
