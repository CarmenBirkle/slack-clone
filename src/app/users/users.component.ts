import { Component } from '@angular/core';
import { FirestoreUserService } from '../service/firestore-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogShowUserComponent } from '../dialog-show-user/dialog-show-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any;
  numOfUsers: number | undefined;
  userOrUsersString: string = 'User';
  inputValue = '';

  constructor(private firestoreUser: FirestoreUserService, public dialog: MatDialog) {
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.firestoreUser.getAllUsers();
    this.numOfUsers = await Object.keys(this.users).length;
    if(this.numOfUsers > 1) {
      this.userOrUsersString = 'Users';
    } else {
      this.userOrUsersString = 'User';
    }
  }

  async searchingUsers(inputString: string) {
    console.log(inputString);

    
  }

  clearSearchbar() {
    this.inputValue = '';
    this.getUsers();
  }

  showUser(id: string) {
    this.dialog.open(DialogShowUserComponent, {
      
    });
  }

}
