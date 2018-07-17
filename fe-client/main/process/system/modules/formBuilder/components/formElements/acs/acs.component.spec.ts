import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeAcsComponent } from './acs.component';

describe('FeAcsComponent', () => {
  let component: FeAcsComponent;
  let fixture: ComponentFixture<FeAcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [     FeAcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeAcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
