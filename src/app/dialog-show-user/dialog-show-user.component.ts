import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dialog-show-user',
  templateUrl: './dialog-show-user.component.html',
  styleUrls: ['./dialog-show-user.component.scss']
})
export class DialogShowUserComponent {

  currentUser: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: any }, 
      private authentication: AuthenticationService) {
    this.currentUser = this.authentication.getUserId();
  }

  openChat(uid: string) {
    console.log('Open Chat with User:', uid)
  }
}
