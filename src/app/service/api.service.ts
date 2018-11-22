import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uri = 'http://localhost:3000/api/users/';
  token: any;
  constructor(private http: HttpClient) { }

  signUp(user): Observable<any> {
    return this.http.post(`${this.uri}signup`, user, httpOptions);
  }
  logIn(user): Observable<any> {
    return this.http.post(`${this.uri}signin`, user, httpOptions);
  }
  social(user): Observable<any> {
    return this.http.post(`${this.uri}socialuser`, user, httpOptions);
  }

  isAuthenticated() {
    this.token = window.localStorage.getItem('token');
    return this.token != null;
  }
}
