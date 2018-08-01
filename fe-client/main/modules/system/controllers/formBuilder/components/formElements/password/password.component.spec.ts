import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FePasswordComponent } from './password.component';

describe('FePasswordComponent', () => {
  let component: FePasswordComponent;
  let fixture: ComponentFixture<FePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
