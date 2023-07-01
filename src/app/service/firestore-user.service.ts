import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {
  user = new User();

  constructor(private firestore: Firestore, private authentication: AuthenticationService) { }

  addUser(userId: any) {
    this.user.guest = false;
    
    const collectionInstance = collection(this.firestore, 'users');
    const documentRef = doc(collectionInstance, userId);
    setDoc(documentRef, this.user.toJSON()).then((result: any) => {})
    .catch((error: any) => {
      console.error('User add ERROR:', error);
    });
  }

  async changeUsername(input: string) {
    const userId = await this.authentication.getUserId();
    console.log('userId:', userId);
    
    /* const docRef = doc(this.firestore, db, userId);

    await updateDoc(docRef, this.user.toJSON())
      .then((e) => {
        console.log('change Firestore Entry:', e);
      })
      .catch((err) => {
        console.log(err);
    }); */
  }

  async getFirestoreUser() {
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
}
