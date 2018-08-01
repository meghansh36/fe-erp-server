import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTimeComponent } from './time.component';

describe('FeTimeComponent', () => {
  let component: FeTimeComponent;
  let fixture: ComponentFixture<FeTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
