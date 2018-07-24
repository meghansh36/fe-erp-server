import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetComponent } from './fieldSet.component';

describe('FieldSetComponent', () => {
  let component: FieldSetComponent;
  let fixture: ComponentFixture<FieldSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
