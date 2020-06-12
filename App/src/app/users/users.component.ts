import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../app.component";
import { UsersService } from "./../users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(
    public rest: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private App: AppComponent
  ) {}
  Users: any = [];
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.Users = {};
    this.rest.getUsers().subscribe((data: {}) => {
      console.log(data);
      this.Users = data;
    });
  }

  delete(id) {
    this.rest.deleteUser(id).subscribe(
      (res) => {
        this.getUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
