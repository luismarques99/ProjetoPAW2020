import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users-detail",
  templateUrl: "./users-detail.component.html",
  styleUrls: ["./users-detail.component.css"],
})
export class UsersDetailComponent implements OnInit {
  user: any;
  constructor(
    public rest: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}

  ngOnInit() {
    this.rest
      .getUser(this.route.snapshot.params["id"])
      .subscribe((data: {}) => {
        console.log(data);
        this.user = data;
      });
  }
}
