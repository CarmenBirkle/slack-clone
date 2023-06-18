import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  // email: max@mustermann.de
  // pw: test123
  // username: MusterMax

  @ViewChild('passwordSignIn') pwdField: ElementRef<HTMLInputElement>;

  errorMsg = null;
  pwdVisible = false;
  pwdShow = 'assets/img/icons/eye.png';
  pwdHide = 'assets/img/icons/eye-crossed-out.png';
  pwdImg: any = this.pwdShow;

  constructor(public authentication: AuthenticationService) {
    /* if(localStorage.getItem('user')!== null) {
      authentication.isLoggedIn = true;
    } else {
      authentication.isLoggedIn = false;
    } */
    this.pwdField = {} as ElementRef<HTMLInputElement>;
  }

  async signIn(email: string, password: string) {
    await this.authentication.signin(email, password);
    this.errorMsg = this.authentication.errorMsg;
  }

  async signInAnonymously() {
    //await this.authentication.signinAnonymously();
    this.signIn('guest@user.com', 'sl4ck-Gu3st')
  }

  toggleShowPwd() {
    this.pwdVisible = !this.pwdVisible;
    this.pwdField.nativeElement.type = this.pwdVisible ? 'text' : 'password';
    this.pwdImg = this.pwdVisible ? this.pwdHide : this.pwdShow;
  }
}
