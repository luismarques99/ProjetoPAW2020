import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
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

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpoint + "users/" + id);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpoint + "users/" + id);
  }

  updateUser(id: string, User: any): Observable<User> {
    console.log(id);
    return this.http.put(endpoint + "users/" + id, User.data.users).pipe(
      tap((_) => console.log(`updated User id=${id}`)),
      catchError(this.handleError<any>("updateTest"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
