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

  constructor(private firestoreUser: FirestoreUserService) {
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.firestoreUser.getUsers();
    /* this.user.sort((a:any, b: any) => {
      if(a.username < b.username) {
        return -1;
      }
    }); */

    console.log(this.users);
    //console.log('Entries:', await Object.keys(this.user).length);
  }

}
