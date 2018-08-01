import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTextComponent } from './signature.component';

describe('FeTextComponent', () => {
  let component: FeTextComponent;
  let fixture: ComponentFixture<FeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
