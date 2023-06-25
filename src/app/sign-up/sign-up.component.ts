import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormValidationService } from '../service/form-validation.service';
import { Firestore, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { NavigationService } from '../service/navigation.service';

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
  errorPwdTxt: string = '';
  errorPwdRepeatTxt: string = '';

  user = new User();
  loading: boolean = false;

  errorUsername: boolean = false;
  errorEmail: boolean = false;
  errorPwd: boolean = false;
  errorPwdRepeat: boolean = false;

  constructor(public authentication: AuthenticationService, 
      private formValidation: FormValidationService, private firestore: Firestore,
      private navigation: NavigationService) {
    this.pwdField = {} as ElementRef<HTMLInputElement>;
    this.pwdRepeatField = {} as ElementRef<HTMLInputElement>;

    this.checkSignedInUser();
  }

  async valUsername(username: string) {
    if(!this.formValidation.testInputLengthLt(username, 3)) {
      this.errorNameTxt = 'Username is to short. Min. 3 characters required.'
    } else if(!this.formValidation.testInputLengthGt(username, 30)) {
      this.errorNameTxt = 'Username is to long. Max. 30 characters allowed.'
    } /* else if(await this.formValidation.testExistUsername(username)) {
      this.errorNameTxt = 'Username already exist.'
    }  */else {
      this.errorNameTxt = '';
      this.errorUsername = false;
      return true;
    }

    this.errorUsername = true;
    return false;
  }

  async valEmail(email: string) {
    if(this.formValidation.testEmailFormat(email)) {
      /* if(await this.formValidation.testExistEmail(email)) {
        this.errorEmailTxt = 'Email already exist.';
      } else {
        this.errorEmailTxt = '';
        this.errorEmail = false;
        return true;
      } */
    } else {
      this.errorEmailTxt = 'Email is invalid.';
    }
    this.errorEmail = true;
    return false;
  }

  valPwd(pwd: string) {
    if(!this.formValidation.testInputLengthLt(pwd, 8)) {
      this.errorPwdTxt = 'Password is to weak. Min. 8 characters required.'
    } else if(!this.formValidation.testInputLengthGt(pwd, 30)) {
      this.errorPwdTxt = 'Password is to long. Max. 30 characters allowed.'
    } else if(!this.formValidation.testInputStrength(pwd, 3)) {
      this.errorPwdTxt = `Password is to weak. You need 3 of this 4 criteria: 
        uppercase, lowercase, numbers, special characters`;
    } else {
      this.errorPwdTxt = '';
      this.errorPwd = false;
      return true;
    }

    this.errorPwd = true;
    return false;
  }

  valPwdRepeat(pwd: string, pwdRepeat: string) {
    if(pwd != pwdRepeat) {
      this.errorPwdRepeatTxt = `Password don't match.`;
      this.errorPwdRepeat = true;
      return false;
    } else {
      this.errorPwdRepeatTxt = '';
      this.errorPwdRepeat = false;
      return true;
    }
  }

  async signUp(email: string, password: string, passwordRepeat: string, username: string) {
    const usernameOk = await this.valUsername(username);
    const emailOk = await this.valEmail(email);
    const pwdOk = await this.valPwd(password);
    const pwdRepeatOk = await this.valPwdRepeat(password, passwordRepeat);
    
    if(usernameOk && emailOk && pwdOk && pwdRepeatOk) {
      //const userId = await this.authentication.sigup(email, password);
    
      // create User in DB ('users')
      //this.addUser(userId);
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

  addUser(userId: string) {
    this.loading = true;
    this.user.guest = false;
    // DELETE
    this.user.username = 'MuMax'

    console.log('add user:', this.user.toJSON());
    
    const collectionInstance = collection(this.firestore, 'users');
    const documentRef = doc(collectionInstance, userId);
    setDoc(documentRef, this.user.toJSON()).then((result: any) => {
      console.log('User add finished:', result);
    })
    .catch((error: any) => {
      console.error('User add ERROR:', error);
    });

    this.loading = false;

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

  onSelect(event: Event) {
    event.preventDefault();
    window.getSelection()?.removeAllRanges();
  }

  async checkSignedInUser() { 
    if(await this.authentication.checkAuthUser()) {
      // go back
      this.navigation.navigateToPreviousPage();
    } else {
      // nobody signed in
    }
  }

  async getFirestoreUser() {
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
}
