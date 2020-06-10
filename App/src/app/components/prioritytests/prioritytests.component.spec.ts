import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritytestsComponent } from './prioritytests.component';

describe('PrioritytestsComponent', () => {
  let component: PrioritytestsComponent;
  let fixture: ComponentFixture<PrioritytestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritytestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritytestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
