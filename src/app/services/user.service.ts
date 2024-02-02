import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAuthenticated = false;
  private token !: string;

  tokenTimer !: any

  private _authStatusListener = new BehaviorSubject(false);
  readonly authStatusListener$ = this._authStatusListener.asObservable();


  constructor(private http: HttpClient, private router: Router) {
    // this.authStatusListener$.subscribe(value => console.log(value))
  }

  login(email: string, password: string) {
    return this.http.post<Token>("http://localhost:3000/api/user/signup", { email: email, password: password });
  }

  setStatusAuth(response: Token) {

    this.token = response.token;
    if (response.token && response.expiresIn) {
      this.isAuthenticated = true;
      this._authStatusListener.next(true);
      this.tokenTimer = this.setAuthTimer(response.expiresIn)
      const now = new Date();
      const expirationDate = new Date(now.getTime() + response.expiresIn * 1000)
      console.log(expirationDate)
      this.saveAuthData(response.token, expirationDate)
      this.router.navigate(['/back-office']);
    }

  }

  logout() {

    this.token = '';
    this.isAuthenticated = false;
    this._authStatusListener.next(false);
    clearTimeout(this.tokenTimer)
    this.clearAuthData();
    this.router.navigate(['/login'])

  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  saveAuthData(token: string, exipirationDate: Date) {

    localStorage.setItem('token', token);
    localStorage.setItem('expiration', exipirationDate.toString())

  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  autoAuthUser() {

    const token = localStorage.getItem('token');
    const exipirationDate = localStorage.getItem('expiration');

    let expiresIn = 0;

    if (token && exipirationDate) {
      this.token = token;
      const now = new Date();
      expiresIn = new Date(exipirationDate).getTime() - now.getTime();

    }
    if (expiresIn > 0) {

      this.isAuthenticated = true;
      this._authStatusListener.next(true);
      this.setAuthTimer(expiresIn/1000)

    }
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout
    }, duration * 1000);

  }




}
