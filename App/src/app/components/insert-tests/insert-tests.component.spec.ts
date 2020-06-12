import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { InsertTestsComponent } from "./insert-tests.component";

describe("InsertTestsComponent", () => {
  let component: InsertTestsComponent;
  let fixture: ComponentFixture<InsertTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsertTestsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
