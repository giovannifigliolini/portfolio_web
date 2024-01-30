import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // readonly userService = inject(UserService);

  loginForm !: FormGroup;

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }


  login() {
    this.userService.createUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(result => console.log(result));
  }
}
