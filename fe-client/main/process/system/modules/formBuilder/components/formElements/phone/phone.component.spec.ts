import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FePhoneComponent } from './phone.component';

describe('FePhoneComponent', () => {
  let component: FePhoneComponent;
  let fixture: ComponentFixture<FePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
