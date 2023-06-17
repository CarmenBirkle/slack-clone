import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(public authentication: AuthenticationService) {}

  async signUp(email: string, password: string, username: string) {
    //await this.authentication.sigup(email, password);
  }
}
