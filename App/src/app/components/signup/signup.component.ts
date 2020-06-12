import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  user = {};
  userV = false;
  emailV = false;
  passwordV = false;
  passwordL = false;

  signupForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signUp() {
    if (
      this.signupForm.value.name == "" ||
      this.signupForm.value.name == undefined
    ) {
      this.userV = true;
    } else {
      this.userV = false;
    }

    if (
      this.signupForm.value.email == "" ||
      this.signupForm.value.email == undefined
    ) {
      this.emailV = true;
    } else {
      this.emailV = false;
    }
    if (
      this.signupForm.value.password == "" ||
      this.signupForm.value.password == undefined
    ) {
      this.passwordV = true;
    } else {
      this.passwordV = false;
    }
    if (this.signupForm.value.password.length < 8) {
      this.passwordL = true;
    } else {
      this.passwordL = false;
    }
    this.authService.signUpUser(this.user).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(["/signin"]);
      },
      (err) => console.log(err)
    );
  }
}
