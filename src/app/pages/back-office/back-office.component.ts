import { Component, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent {

  authStatus$ = this.userService.authStatusListener$;

  constructor(private userService: UserService) {
    
  }
  

  logout(){

    this.userService.logout();
  }

}
