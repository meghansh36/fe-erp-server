import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeAutoCompleteComponent } from './autoComplete.component';

describe('FeAutoCompleteComponent', () => {
  let component: FeAutoCompleteComponent;
  let fixture: ComponentFixture<FeAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [     FeAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
