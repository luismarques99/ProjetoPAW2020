import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { TestsService } from "src/app/tests.service";
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST",
    "Content-Type": "application/json",
  }),
};
const cenas = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST",
  }),
};
@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.css"],
})
export class TestsComponent implements OnInit {
  constructor(
    public rest: TestsService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}
  Tests: any = [];

  ngOnInit() {
    this.getTests();
  }
  getTests() {
    this.Tests = {};
    this.rest.getTests().subscribe((data: {}) => {
      console.log(data);
      this.Tests = data;
    });
  }
}
