import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeDatComponent } from './dat.component';

describe('FeDatComponent', () => {
  let component: FeDatComponent;
  let fixture: ComponentFixture<FeDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
