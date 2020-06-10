import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { TestsService } from "src/app/tests.service";

@Component({
  selector: "app-tests-detail",
  templateUrl: "./tests-detail.component.html",
  styleUrls: ["./tests-detail.component.css"],
})
export class TestsDetailComponent implements OnInit {
  test: any;
  constructor(
    public rest: TestsService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}

  ngOnInit() {
    this.rest
      .getTest(this.route.snapshot.params["id"])
      .subscribe((data: {}) => {
        console.log(data);
        this.test = data;
      });
  }
}
