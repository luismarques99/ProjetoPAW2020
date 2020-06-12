import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { UsersService } from "../users.service";

@Component({
  selector: "app-users-edit",
  templateUrl: "./users-edit.component.html",
  styleUrls: ["./users-edit.component.css"],
})
export class UsersEditComponent implements OnInit {
  @Input() usersData: any = {
    password: "",
  };
  constructor(
    public rest: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}

  ngOnInit() {
    this.rest
      .updateUser(this.route.snapshot.params["id"], this.usersData)
      .subscribe((data: {}) => {
        console.log(data);
        this.usersData = data;
      });
  }
  updateUser() {
    this.rest
      .updateUser(this.route.snapshot.params["id"], this.usersData)
      .subscribe(
        (data) => {
          this.router.navigate(["/my-tests"]);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
