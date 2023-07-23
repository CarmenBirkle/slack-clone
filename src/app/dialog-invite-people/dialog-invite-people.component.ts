import { Component } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dialog-invite-people',
  templateUrl: './dialog-invite-people.component.html',
  styleUrls: ['./dialog-invite-people.component.scss']
})
export class DialogInvitePeopleComponent {
  appComponentContent: any;

  constructor(public sharedService: SharedService) {
    this.appComponentContent = this.sharedService.appComponentContent;
  }

  sendInvite() {
    console.log();
  }

  copyInviteLink() {
    var copyText = window.location.origin + '/sign-up';

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
  }
}
