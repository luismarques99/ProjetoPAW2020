import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./Models/User";
const endpoint = "http://localhost:3000/api/v1/";
const cenas = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST",
  }),
};
@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpoint + "users");
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpoint + "users/" + id);
  }
}
