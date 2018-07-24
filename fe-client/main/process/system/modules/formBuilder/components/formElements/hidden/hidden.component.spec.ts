import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeHiddenComponent } from './hidden.component';

describe('FeHiddenComponent', () => {
  let component: FeHiddenComponent;
  let fixture: ComponentFixture<FeHiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeHiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
