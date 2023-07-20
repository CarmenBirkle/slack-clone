import { Component } from '@angular/core';
import { FirestoreUserService } from '../service/firestore-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogShowUserComponent } from '../dialog-show-user/dialog-show-user.component';
import { AuthenticationService } from '../service/authentication.service';
import { DialogInvitePeopleComponent } from '../dialog-invite-people/dialog-invite-people.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  currentUserId: string | undefined;
  users: any;
  allUsers: any;
  numOfUsers: number | undefined;
  userOrUsersString: string = 'User'; // name after "number of users"
  inputValue = ''; // searchbar input value

  constructor(private firestoreUser: FirestoreUserService, public dialog: MatDialog,
      private authentication: AuthenticationService) {
    this.currentUserId = authentication.getUserId();
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.firestoreUser.getAllUsers();
    console.log(this.users);
    
    this.numOfUsers = await Object.keys(this.users).length;
    this.allUsers = this.users;

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
    this.users = this.allUsers;
  }

  showUser(user: any) {
    this.dialog.open(DialogShowUserComponent, {
      data: { user: user },
    });
  }

  invitePeople() {
    this.dialog.open(DialogInvitePeopleComponent, { });
  }

}
