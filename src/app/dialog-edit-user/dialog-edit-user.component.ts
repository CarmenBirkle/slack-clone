import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  currentUserId: string;
  

  constructor(authentication: AuthenticationService) {
    this.currentUserId = authentication.getUserId();

  }



}
