import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeFormDragComponent } from './formDrag.component';

describe('FeFormDragComponent', () => {
  let component: FeFormDragComponent;
  let fixture: ComponentFixture<FeFormDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeFormDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeFormDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
