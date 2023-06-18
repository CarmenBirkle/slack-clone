import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormValidationService } from '../service/form-validation.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  // email: max@mustermann.de
  // username: MusterMax
  // uid: "BDFNy8NT4GOD7rFa5aIuNsL1Kr82"

  @ViewChild('passwordSignUp') pwdField: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRepeat') pwdRepeatField: ElementRef<HTMLInputElement>;

  pwdVisible = false;
  pwdRepeatVisible = false;
  pwdShow = 'assets/img/icons/eye.png';
  pwdHide = 'assets/img/icons/eye-crossed-out.png';
  pwdImg: any = this.pwdShow;
  pwdRepeatImg: any = this.pwdShow;

  errorNameTxt: string = '';
  errorEmailTxt: string = '';
  errorPwTxt: string = '';
  errorPwRepeatTxt: string = '';

  user = new User();
  loading: boolean = false;

  constructor(public authentication: AuthenticationService, 
      private formValidation: FormValidationService, private firestore: Firestore) {
    this.pwdField = {} as ElementRef<HTMLInputElement>;
    this.pwdRepeatField = {} as ElementRef<HTMLInputElement>;
  }

  async valUsername(username: string) {
    var errors: boolean = false;

    if(!this.formValidation.testInputLengthLt(username, 3)) {
      this.errorNameTxt = 'Username is to short. Min. 3 characters required.'
      errors = true;
    } else if(!this.formValidation.testInputLengthGt(username, 30)) {
      this.errorNameTxt = 'Username is to long. Max. 30 characters allowed.'
      errors = true;
    } else if(await this.formValidation.testExistUsername(username)) {
      this.errorNameTxt = 'Username already exist.'
    } else {
      this.errorNameTxt = '';
      errors = false;
    }

    if(errors) {
      // red border
      return false;
    } else {
      // remove red border
      return true;
    }
  }

  valPwdRepeat(pwd: string, pwdRepeat: string) {
    if(pwd != pwdRepeat) {
      this.errorPwRepeatTxt = `Password don't match`;
      // red border
      return false;
    } else {
      this.errorPwRepeatTxt = '';
      // remove red border
      return true;
    }
  }

  async signUp(email: string, password: string, passwordRepeat: string, username: string) {
    const usernameOk = await this.valUsername(username);
    const pwdRepeatOk = await this.valPwdRepeat(password, passwordRepeat);
    
    if(usernameOk && pwdRepeatOk) {
      //await this.authentication.sigup(email, password);
    
    // create User in DB ('users')
    this.addUser();
    }
  }

  toggleShowPwd(pwdRepeatInput: boolean) {
    if(pwdRepeatInput) {
      this.pwdRepeatVisible = !this.pwdRepeatVisible;
      this.pwdRepeatField.nativeElement.type = this.pwdRepeatVisible ? 'text' : 'password';
      this.pwdRepeatImg = this.pwdRepeatVisible ? this.pwdHide : this.pwdShow;
    } else {
      this.pwdVisible = !this.pwdVisible;
      this.pwdField.nativeElement.type = this.pwdVisible ? 'text' : 'password';
      this.pwdImg = this.pwdVisible ? this.pwdHide : this.pwdShow;
    }
  }

  addUser() {
    this.loading = true;
    this.user.guest = false;
    console.log('add user:', this.user.toJSON());
    

    /* const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, this.user.toJSON()).then((result: any) => {
      console.log('Adding user finished', result);
      this.loading = false;
    }); */
  }

  signUpKey(event: KeyboardEvent) {
    const signUpBtn = document.getElementById('signUpBtn');

    if (event.key === "Enter" && signUpBtn) {
      signUpBtn.click();
    }
  }
}
