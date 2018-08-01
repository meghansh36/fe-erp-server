import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeDateComponent } from './date.component';

describe('FeDateComponent', () => {
  let component: FeDateComponent;
  let fixture: ComponentFixture<FeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
