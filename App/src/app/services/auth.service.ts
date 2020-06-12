import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private URL = "http://localhost:3000/api/v1/";
  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user) {
    return this.http.post<any>(this.URL + "users/register", user);
  }

  signInUser(user) {
		return this.http
			.post<any>(this.URL + "users/login", user);

  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/tasks"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
