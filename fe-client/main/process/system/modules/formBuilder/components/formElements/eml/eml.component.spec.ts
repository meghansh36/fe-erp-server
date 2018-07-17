import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeEmlComponent } from './eml.component';

describe('FeEmlComponent', () => {
  let component: FeEmlComponent;
  let fixture: ComponentFixture<FeEmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeEmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeEmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
