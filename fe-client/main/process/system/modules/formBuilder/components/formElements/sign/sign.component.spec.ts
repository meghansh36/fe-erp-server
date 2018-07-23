import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTxtComponent } from './sign.component';

describe('FeTxtComponent', () => {
  let component: FeTxtComponent;
  let fixture: ComponentFixture<FeTxtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeTxtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
