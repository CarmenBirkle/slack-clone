import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreUserService } from '../service/firestore-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  currentUserId: string;
  currentUser$: Promise<any>;
  isUsernameEditVisible = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public firestoreUserService: FirestoreUserService) {
    this.currentUserId = data.currentUserId;
    this.getUser();
  }

  getUser() {
    this.currentUser$ = this.firestoreUserService.getUser(this.currentUserId);
    console.log('current User:', this.currentUser$);
  }

  toggleUsernameEdit() {
    this.isUsernameEditVisible = !this.isUsernameEditVisible;
  }

  saveUsername() {
    // push to firestore

    this.toggleUsernameEdit();
  }

}
