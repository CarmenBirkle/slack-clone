import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreUserService } from '../service/firestore-user.service';
import { FormValidationService } from '../service/form-validation.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  currentUserId: string;
  //currentUser$: Promise<any>;
  currentUser: any;

  isUsernameEditVisible = false;

  errorUsername: boolean = false;
  errorNameTxt: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public firestoreUserService: FirestoreUserService,
    private formValidation: FormValidationService) {
    this.currentUserId = data.currentUserId;
    this.getUser();
  }

  getUser(): void {
    //this.currentUser$ = this.firestoreUserService.getUser(this.currentUserId);
    //console.log('current User:', this.currentUser$);

    this.firestoreUserService.getUser(this.currentUserId).then(user => {
      this.currentUser = user;
      //console.log('current User:', this.currentUser);
    });
  }

  toggleUsernameEdit() {
    this.isUsernameEditVisible = !this.isUsernameEditVisible;
  }

  async saveUsername(newUsername) {
    // validate input
    const usernameOk = await this.valUsername(newUsername);
    
    if(!this.currentUser.guest){
      if(usernameOk){
        
        if(!this.errorUsername && !this.currentUser.guest) {
          this.firestoreUserService.changeUsername(newUsername);
        }
        this.toggleUsernameEdit();
      }
    } else {
      this.errorNameTxt = 'Guest-User cannot edit profile'
    }
  }

  async valUsername(username: string) {
    const maxUsernameLength = 30;
    const minUsernameLength = 2;

    if(!this.formValidation.testInputLengthLt(username, minUsernameLength)) {
      this.errorNameTxt = `Username is to short. Min. ${minUsernameLength} characters required.`;
    } else if(!this.formValidation.testInputLengthGt(username, maxUsernameLength)) {
      this.errorNameTxt = `Username is to long. Max. ${maxUsernameLength} characters allowed.`;
    } else {
      const usernameExist = await this.formValidation.testExistUsername(username);
      if(usernameExist) {        
        if(username.toLowerCase() == this.currentUser.username.toLowerCase()) {
          this.errorNameTxt = '';
          this.errorUsername = true;
          return true;
        } else {
          this.errorNameTxt = 'Username already exist.';
        }
      } else {
        this.errorNameTxt = '';
        this.errorUsername = false;
        return true;
      }
    }

    this.errorUsername = true;
    return false;
  }

}
