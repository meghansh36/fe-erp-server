import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkComponent } from './chk.component';

describe('ChkComponent', () => {
  let component: ChkComponent;
  let fixture: ComponentFixture<ChkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
