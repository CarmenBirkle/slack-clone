import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(public authentication: AuthenticationService) {
    if(localStorage.getItem('user')!== null) {
      authentication.isLoggedIn = true;
    } else {
      authentication.isLoggedIn = false;
    }
  }

  async signIn(email: string, password: string) {
    await this.authentication.signin(email, password);

  }

  async signInAnonymously() {
    await this.authentication.signinAnonymously();
  }
}
