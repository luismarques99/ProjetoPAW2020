import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-insert-tests",
  templateUrl: "./insert-tests.component.html",
  styleUrls: ["./insert-tests.component.css"],
})
export class InsertTestsComponent implements OnInit {
  tests = {};
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {}

  insertTests() {
    this.taskService.insertTest(this.tests).subscribe(
      (res) => {
        console.log(res);

        this.router.navigate(["/test-success"]);
      },
      (err) => console.log(err)
    );
  }
}
