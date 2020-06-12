import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { TestsService } from "src/app/tests.service";

@Component({
  selector: "app-prioritytests",
  templateUrl: "./prioritytests.component.html",
  styleUrls: ["./prioritytests.component.css"],
})
export class PrioritytestsComponent implements OnInit {
  constructor(
    public rest: TestsService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}
  PriorityTests: any = [];
  ngOnInit() {
    this.getPriorityTests();
  }
  getPriorityTests() {
    this.PriorityTests = {};
    this.rest.getPriorityTests().subscribe((data: {}) => {
      console.log(data);
      this.PriorityTests = data;
    });
  }
}
