import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconicButtonComponent } from './iconicButton.component';

describe('IconicButtonComponent', () => {
  let component: IconicButtonComponent;
  let fixture: ComponentFixture<IconicButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconicButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
