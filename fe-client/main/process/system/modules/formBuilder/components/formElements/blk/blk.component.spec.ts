import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlkComponent } from './blk.component';

describe('BlkComponent', () => {
  let component: BlkComponent;
  let fixture: ComponentFixture<BlkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
