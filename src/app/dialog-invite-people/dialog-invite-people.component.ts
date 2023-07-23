import { Component } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { FormValidationService } from '../service/form-validation.service';

@Component({
  selector: 'app-dialog-invite-people',
  templateUrl: './dialog-invite-people.component.html',
  styleUrls: ['./dialog-invite-people.component.scss']
})
export class DialogInvitePeopleComponent {
  appComponentContent: any;
  emailErrorTxt: string = '';

  constructor(public sharedService: SharedService,
    private formValidation: FormValidationService) {
    this.appComponentContent = this.sharedService.appComponentContent;
  }

  async sendInviteBtn(inputString: string) {
    const emailOk = await this.valEmail(inputString);
    //console.log(emailOk);
  }

  sendInviteKey(event: any, inputString: string) {
    if (event.key === "Enter") {
      this.sendInviteBtn(inputString);
    }
  }

  copyInviteLink() {
    var copyText = window.location.origin + '/sign-up';

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  }
  
  async valEmail(email: string) {
    if(this.formValidation.testEmailFormat(email)) {
      if(await this.formValidation.testExistEmail(email)) {
        // Email not exist
        this.emailErrorTxt = '';
      } else {
        this.emailErrorTxt = 'Email already exist';
      }
    }
    // false Email format
    this.emailErrorTxt = 'Email is invalid';
  }
}
