import { endpoints } from './../utils/endpoints';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  endpoint: string = endpoints.ergoapi;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    return this.currentUserSubject.value;
  }

  public setUserValue(value) {
    localStorage.setItem('currentUser', value);
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(
        `https://expokinal-backend2019.herokuapp.com/api/v1/users/login`, 
        { email, password}, {headers: this.httpOptions.headers}
      );
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public signUp(email: string, password: string, name: string, username: string): Observable<any> {
    return this.http.post<any>(
        `https://expokinal-backend2019.herokuapp.com/api/v1/users/sign-up`, 
        { email, password, name, username}, {headers: this.httpOptions.headers}
      );
  }
}
