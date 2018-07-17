import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeDtiComponent } from './dti.component';

describe('FeDtiComponent', () => {
  let component: FeDtiComponent;
  let fixture: ComponentFixture<FeDtiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeDtiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeDtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
