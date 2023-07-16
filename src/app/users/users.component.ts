import { Component } from '@angular/core';
import { FirestoreUserService } from '../service/firestore-user.service';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any;
  //loadedUsers: number = 5;

  constructor(private firestoreUser: FirestoreUserService) {
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.firestoreUser.getAllUsers(); //this.loadedUsers, this.loadedUsers

    console.log('Users', this.users);
    console.log('Entries:', await Object.keys(this.users).length);
  }

  /* async loadMoreUsers() {
    const numNewLoadedUsers = 5;

    this.users.push(await this.firestoreUser.getAllUsers()) //this.loadedUsers, numNewLoadedUsers

    this.loadedUsers += numNewLoadedUsers;

    console.log('Users', this.users);
    console.log('Entries:', await Object.keys(this.users).length);
  } */

}
