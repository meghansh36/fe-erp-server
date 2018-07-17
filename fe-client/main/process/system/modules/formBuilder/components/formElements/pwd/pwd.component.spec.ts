import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FePwdComponent } from './pwd.component';

describe('FePwdComponent', () => {
  let component: FePwdComponent;
  let fixture: ComponentFixture<FePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
