import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FePhnComponent } from './phn.component';

describe('FePhnComponent', () => {
  let component: FePhnComponent;
  let fixture: ComponentFixture<FePhnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FePhnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FePhnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
