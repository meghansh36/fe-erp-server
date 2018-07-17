import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTimComponent } from './tim.component';

describe('FeTimComponent', () => {
  let component: FeTimComponent;
  let fixture: ComponentFixture<FeTimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeTimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeTimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
