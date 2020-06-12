import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  user = {};
  noFound = false;
  signinForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.authService.signInUser(this.user).subscribe(
      (res) => {
        this.noFound = true;
        console.log(res);
        localStorage.setItem("token", res.data.token);
        this.router.navigate(["/private"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
