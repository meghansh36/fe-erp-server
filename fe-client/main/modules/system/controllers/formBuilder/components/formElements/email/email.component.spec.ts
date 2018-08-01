import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeEmailComponent } from './email.component';

describe('FeEmailComponent', () => {
  let component: FeEmailComponent;
  let fixture: ComponentFixture<FeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
