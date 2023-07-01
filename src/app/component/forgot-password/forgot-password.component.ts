import { Component } from '@angular/core';
import { FormValidationService } from 'src/app/service/form-validation.service';
import { SignInComponent } from 'src/app/sign-in/sign-in.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  errorMsg = null;
  errorEmailTxt: string = '';
  resetPwdSent: boolean = false;

  constructor(public signIn: SignInComponent, private formValidation: FormValidationService) { }

  async resetPassword(email: string) {
    if(await this.valEmail(email)) {
      console.log('send reset Email');
      this.resetPwdSent = true;
      setTimeout(() => {
        this.signIn.forgotPassword = false;
      }, 5000);
    }
  }

  async valEmail(email: string) {
    if(this.formValidation.testEmailFormat(email)) {
      if(await this.formValidation.testExistEmail(email)) {
        this.errorEmailTxt = 'Email not exist.';
        return false;
      } else {
        // Email exist
        this.errorEmailTxt = '';
        return true;
      }
    }
    // false Email format
    this.errorEmailTxt = 'Email is invalid.';
    return false;
  }
}
