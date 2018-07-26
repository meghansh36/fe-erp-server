import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxesComponent } from './select-boxes.component';

describe('SelectBoxesComponent', () => {
  let component: SelectBoxesComponent;
  let fixture: ComponentFixture<SelectBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
