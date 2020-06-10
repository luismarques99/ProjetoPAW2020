import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { TestsService } from "src/app/tests.service";

@Component({
  selector: "app-my-tests",
  templateUrl: "./my-tests.component.html",
  styleUrls: ["./my-tests.component.css"],
})
export class MyTestsComponent implements OnInit {
  constructor(
    public rest: TestsService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}
  Tests: any = [];

  ngOnInit() {
    this.getMyTests();
  }

  getMyTests() {
    this.Tests = {};
    this.rest.getMyTests().subscribe((data: {}) => {
      console.log(data);
      this.Tests = data;
    });
  }
}
