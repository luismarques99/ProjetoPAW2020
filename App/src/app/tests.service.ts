import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Test } from "./Models/Test";

const endpoint = "http://localhost:3000/api/v1/";
const token = localStorage.getItem("token");
const cenas = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST",
  }),
};
@Injectable({
  providedIn: "root",
})
export class TestsService {
  HttpClient: any;
  constructor(private http: HttpClient) {}
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(endpoint + "tests", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }

  getPendingTests(): Observable<Test[]> {
    return this.http.get<Test[]>(endpoint + "tests/pendingtests", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }

  getPriorityTests(): Observable<Test[]> {
    return this.http.get<Test[]>(endpoint + "tests/prioritytests", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }

  getTest(testsid: String): Observable<Test> {
    return this.http.get<Test>(endpoint + "tests/" + testsid, {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }

  getMyTests(): Observable<Test[]> {
    return this.http.get<Test[]>(endpoint + "tests/forUser/id", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });
  }

  updateTest(testsid: any, Test: any): Observable<Test> {
    console.log(testsid);
    return this.http
      .put(endpoint + "tests/" + testsid, Test.data.testes, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .pipe(
        tap((_) => console.log(`updated Tests id=${testsid}`)),
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
