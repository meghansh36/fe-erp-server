import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCurrencyComponent } from './cur.component';

describe('FeCurrencyComponent', () => {
  let component: FeCurrencyComponent;
  let fixture: ComponentFixture<FeCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
