import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private subject = new BehaviorSubject<any>(0);
  public mysubject = this.subject.asObservable();
  getUserId(): Observable<any> {
    return this.subject.asObservable();
  }
  sendUserId(data) {

    this.subject.next(data);
  }

  uri = 'http://localhost:3000/api/';
  token: any;

  gethttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return httpOptions;
  }

  constructor(private http: HttpClient) { }

  signUp(user): Observable<any> {
    return this.http.post(`${this.uri}users/signup`, user, httpOptions);
  }
  logIn(user): Observable<any> {
    return this.http.post(`${this.uri}users/signin`, user, httpOptions);
  }
  social(user): Observable<any> {
    return this.http.post(`${this.uri}users/socialuser`, user, httpOptions);
  }

  isAuthenticated() {
    this.token = window.localStorage.getItem('token');
    return this.token != null;
  }


  getAllTodos(data): Observable<any> {
    const header = this.gethttpOptions();
    return this.http.post(`${this.uri}todos`, data, header);
  }

  addTodo(data): Observable<any> {
    const header = this.gethttpOptions();
    return this.http.post(`${this.uri}addtodo`, data, header);
  }
  rmTodo(data): Observable<any> {
    const header = this.gethttpOptions();
    return this.http.get(`${this.uri}rmtodo/${data._id}`, header);
  }
  isComplete(data): Observable<any> {
    const header = this.gethttpOptions();
    return this.http.get(`${this.uri}tododone/${data._id}`, header);
  }
}
