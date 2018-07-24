import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTextAreaComponent } from './textArea.component';

describe('FeTextAreaComponent', () => {
  let component: FeTextAreaComponent;
  let fixture: ComponentFixture<FeTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeTextAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
