import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  userData: Array<any> | undefined;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  testInputLengthLt(inputString: string, rqdLength: number) {
    if(inputString.length >= rqdLength) {
      return true;
    } else {
      return false;
    }
  }

  testInputLengthGt(inputString: string, rqdLength: number) {
    if(inputString.length > rqdLength) {
      return false;
    } else {
      return true;
    }
  }

/*   testExistUsername(inputString: string) {
    const userExists = this.userData?.some(
      userData => userData.username.toLowerCase() === inputString.toLowerCase());

    if(userExists) {
      return true; // user exist
    } else {
      return false; // not exist
    }
  } */

/*   testExistEmail(inputString: string) {
    const emailExists = this.userData?.some(
      userData => userData.email.toLowerCase() === inputString.toLowerCase());

    if(emailExists) {
      return true; // user exist
    } else {
      return false; // not exist
    }
  } */

  testEmailFormat(inputString: string) {
    const trimmedEmail = inputString.trim();

    const email = inputString.toLowerCase();

    const re = /\S+@\S+\.\S+/;

    if (!re.test(email) || trimmedEmail.includes(" ")) {
      return false;
    } else {
      return true;
    }
  }

  testInputStrength(inputString: string, numOfCritera: number) {
    const hasUpperCase = /[A-Z]/.test(inputString);
    const hasLowerCase = /[a-z]/.test(inputString);
    const hasNumbers = /\d/.test(inputString);
    const hasSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(inputString);

    const count = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialCharacters].filter(Boolean).length;

    if (count >= numOfCritera) {
      return true;
    } else {
      return false;
    }
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');

    collectionData(collectionInstance, {idField: 'id'})
      .subscribe(changes => {
        console.log('Received changes from DB', changes);
        this.userData = changes;
    });
  }

}
