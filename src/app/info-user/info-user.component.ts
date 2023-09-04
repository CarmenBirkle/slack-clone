import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreUserService } from '../service/firestore-user.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from 'src/models/user.class';
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent{
  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [
                    Validators.required,
  	                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
	});

  userId: any = null;
  user: User = new User ();
  nameEditable = false
  emailEditable = false

  constructor(public firestoreUser: FirestoreUserService, private authentication: AuthenticationService) {
    this.userId = authentication.getUserId();
    console.log(this.userId);
    this.getUser();
  }

  async getUser() {
    this.firestoreUser.getUser(this.userId).then( user => {
      this.profileForm.get('email')?.setValue(user.email)
      this.profileForm.get('username')?.setValue(user.username)
   
      
      console.log(user)
    })
  }

  save(){
    if(this.profileForm.valid){
      this.firestoreUser.changeUsername(this.profileForm.get('username')?.value || '')
      this.firestoreUser.changeEmail(this.profileForm.get('email')?.value || '')
      this.nameEditable=false;
      this.emailEditable=false;
    }
  }

  changeName() {
    this.nameEditable=!this.nameEditable
  }

  changeEmail(){
    this.emailEditable=!this.emailEditable
  }

}




