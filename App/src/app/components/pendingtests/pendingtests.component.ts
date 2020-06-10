import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { TestsService } from "src/app/tests.service";

@Component({
  selector: "app-pendingtests",
  templateUrl: "./pendingtests.component.html",
  styleUrls: ["./pendingtests.component.css"],
})
export class PendingtestsComponent implements OnInit {
  constructor(
    public rest: TestsService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}
  PendingTests: any = [];

  ngOnInit() {
    this.getPendingTests();
  }
  getPendingTests() {
    this.PendingTests = {};
    this.rest.getPendingTests().subscribe((data: {}) => {
      console.log(data);
      this.PendingTests = data;
    });
  }
}
