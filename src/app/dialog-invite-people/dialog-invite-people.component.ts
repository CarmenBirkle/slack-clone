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
    
    if(emailOk) {
      // send invite email

      // disable btn and input

      let fd = new FormData();
      /* let requestingName = nameField.value + ' - [ ' + emailField.value + ' ] ';

      fd.append('name', requestingName); */
      fd.append('message', 
        'Someone want invite you to' + this.appComponentContent.title);
      fd.append('project', 'invite@' + this.appComponentContent.title)
      // send
      await fetch('https://gruppe-597.developerakademie.net/send_mail/send_mail.php', {
        method: 'POST',
        body: fd
      });

      // message sended

      // show send notification and close component
    }
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
        return true;
      } else {
        this.emailErrorTxt = 'User already exist';
        return false;
      }
    } else {
      // false Email format
      this.emailErrorTxt = 'Email-Address is invalid';
      return false;
    }
  }
}
