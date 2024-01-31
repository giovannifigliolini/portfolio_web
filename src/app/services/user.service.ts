import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router : Router) { }

  login(email : string, password : string){
    return this.http.post("http://localhost:3000/api/user/signup", {email:email,password:password});
  }
}
