import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreUserService } from '../service/firestore-user.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    pin: new FormControl(''),
  });

  userId: any = null;
  user: any = null;

  constructor(public firestoreUser: FirestoreUserService, private authentication: AuthenticationService) {
    this.userId = authentication.getUserId();
    console.log(this.userId);
    this.getUser();
  }

  async getUser() {
    this.user = this.firestoreUser.getUser(this.userId);
    console.log(this.user);
    
  }


}
