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
  allUsers: any;
  numOfUsers: number | undefined;
  userOrUsersString: string = 'User'; // name after "number of users"
  inputValue = ''; // searchbar input value

  constructor(private firestoreUser: FirestoreUserService, public dialog: MatDialog) {
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

}
