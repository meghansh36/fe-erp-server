import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeHidComponent } from './hid.component';

describe('FeHidComponent', () => {
  let component: FeHidComponent;
  let fixture: ComponentFixture<FeHidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeHidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeHidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
