import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcbComponent } from './icb.component';

describe('IcbComponent', () => {
  let component: IcbComponent;
  let fixture: ComponentFixture<IcbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
