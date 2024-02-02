import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm !: FormGroup;
  errorLogin = false;

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }


  login() {

    this.errorLogin = false;

    this.userService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(
      catchError(error => {
        if(error.status === 401)
        this.errorLogin = true;
      return throwError(()=>new Error('error'))
      })
    ).subscribe(response => {
      this.userService.setStatusAuth(response);
    })

  }
}
