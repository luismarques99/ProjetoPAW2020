import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users-delete",
  templateUrl: "./users-delete.component.html",
  styleUrls: ["./users-delete.component.css"],
})
export class UsersDeleteComponent implements OnInit {
  testsData: any;
  constructor(
    public rest: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}

  ngOnInit() {}
}
