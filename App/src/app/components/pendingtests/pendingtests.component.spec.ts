import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingtestsComponent } from './pendingtests.component';

describe('PendingtestsComponent', () => {
  let component: PendingtestsComponent;
  let fixture: ComponentFixture<PendingtestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingtestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingtestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
