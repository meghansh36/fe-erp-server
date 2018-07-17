import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeMonComponent } from './mon.component';

describe('FeMonComponent', () => {
  let component: FeMonComponent;
  let fixture: ComponentFixture<FeMonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeMonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeMonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
