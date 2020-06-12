import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { TestsService } from "src/app/tests.service";

@Component({
  selector: "app-tests-edit",
  templateUrl: "./tests-edit.component.html",
  styleUrls: ["./tests-edit.component.css"],
})
export class TestsEditComponent implements OnInit {
  @Input() testsData: any = {
    user_state: "",
    test_state: "",
    date: "",
  };
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
        this.testsData = data;
      });
  }

  updateTest() {
    this.rest
      .updateTest(this.route.snapshot.params["id"], this.testsData)
      .subscribe(
        (data) => {

          this.router.navigate([
            "/tests-detail/" + this.route.snapshot.params["id"],
          ]);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
