import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeHTMLComponent } from './html.component';

describe('FeHTMLComponent', () => {
  let component: FeHTMLComponent;
  let fixture: ComponentFixture<FeHTMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeHTMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeHTMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
