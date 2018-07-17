import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCurComponent } from './cur.component';

describe('FeCurComponent', () => {
  let component: FeCurComponent;
  let fixture: ComponentFixture<FeCurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeCurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeCurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
