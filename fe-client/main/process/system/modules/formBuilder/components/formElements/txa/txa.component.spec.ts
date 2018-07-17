import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTxaComponent } from './txa.component';

describe('FeTxaComponent', () => {
  let component: FeTxaComponent;
  let fixture: ComponentFixture<FeTxaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeTxaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeTxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
