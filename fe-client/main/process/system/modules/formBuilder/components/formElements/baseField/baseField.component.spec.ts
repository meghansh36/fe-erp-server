import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeAdrComponent } from './adr.component';

describe('FeAdrComponent', () => {
  let component: FeAdrComponent;
  let fixture: ComponentFixture<FeAdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeAdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeAdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
