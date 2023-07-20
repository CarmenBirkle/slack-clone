import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-invite-people',
  templateUrl: './dialog-invite-people.component.html',
  styleUrls: ['./dialog-invite-people.component.scss']
})
export class DialogInvitePeopleComponent {

  constructor() { }

  sendInvite() {
    console.log();
  }

  copyInviteLink() {
    var copyText = '/sign-up';

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  }
}
