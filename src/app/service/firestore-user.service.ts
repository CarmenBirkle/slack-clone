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
    const avatarNr = Math.floor(Math.random() * 24)+1;
    this.user.guest = false;
    this.user.photo = `assets/img/avatar/avatar${avatarNr}.png`;
    
    const collectionInstance = collection(this.firestore, 'users');
    const documentRef = doc(collectionInstance, userId);
    setDoc(documentRef, this.user.toJSON()).then((result: any) => {})
    .catch((error: any) => {
      console.error('User add ERROR:', error);
    });
  }

  async changeUsername(input: string) {
    const userId = await this.authentication.getUserId();
    const docRef = doc(this.firestore, 'users', `${userId}`);

    await updateDoc(docRef, {username: input})
      .then((e) => { })
      .catch((err) => {
        console.log('Error while changing Username', err);
    });
  }

  async changeEmail(newEmail: string) {
    const userId = await this.authentication.getUserId();
    const docRef = doc(this.firestore, 'users', `${userId}`);

    await updateDoc(docRef, {email: newEmail})
      .then((e) => { })
      .catch((err) => {
        console.log('Error while changing Username', err);
    });
  }

  async changePhoto(newPhotoUrl: string) {
    const userId = await this.authentication.getUserId();
    const docRef = doc(this.firestore, 'users', `${userId}`);

    await updateDoc(docRef, {photo: newPhotoUrl})
      .then((e) => { })
      .catch((err) => {
        console.log('Error while changing Username', err);
    });
  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.firestore, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  async getUser(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('User not exist');
      return null;
    }
  }

}
