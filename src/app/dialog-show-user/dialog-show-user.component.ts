import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-show-user',
  templateUrl: './dialog-show-user.component.html',
  styleUrls: ['./dialog-show-user.component.scss']
})
export class DialogShowUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: any }) {}

  openChat(uid: string) {
    console.log('Open Chat with User:', uid)
  }
}
