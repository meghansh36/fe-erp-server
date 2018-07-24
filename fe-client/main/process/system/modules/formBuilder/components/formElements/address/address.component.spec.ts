import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeAddressComponent } from './address.component';

describe('FeAddressComponent', () => {
  let component: FeAddressComponent;
  let fixture: ComponentFixture<FeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
