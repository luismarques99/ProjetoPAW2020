import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuccessComponent } from './test-success.component';

describe('TestSuccessComponent', () => {
  let component: TestSuccessComponent;
  let fixture: ComponentFixture<TestSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
