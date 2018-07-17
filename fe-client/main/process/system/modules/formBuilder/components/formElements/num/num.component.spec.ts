import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeNumComponent } from './num.component';

describe('FeNumComponent', () => {
  let component: FeNumComponent;
  let fixture: ComponentFixture<FeNumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeNumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
