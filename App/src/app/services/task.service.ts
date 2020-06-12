import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private URL = "http://localhost:3000/api/v1";
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.URL + "/users");
  }

  insertTest(tests) {
    return this.http.post<any>(this.URL + "/tests", tests, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }
}
