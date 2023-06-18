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

  testExistUsername(inputString: string) {
    const userExists = this.userData?.some(
      userData => userData.username.toLowerCase() === inputString.toLowerCase());

    if(userExists) {
      return true; // user exist
    } else {
      return false; // not exist
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
