import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MslComponent } from './msl.component';

describe('MslComponent', () => {
  let component: MslComponent;
  let fixture: ComponentFixture<MslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
