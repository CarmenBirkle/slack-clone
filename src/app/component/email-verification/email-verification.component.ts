import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  verificationSended: boolean = false;


  constructor(public authentication: AuthenticationService) { }

  sendVerification() {
    this.verificationSended = true;
    this.authentication.emailVerification()

    /* setTimeout(() => {
      this.verificationSended = false;
    }, 3000); */
  }
}
