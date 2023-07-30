import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { }

  openChat(uid: string, puid: string) {
    console.log('Open Chat with User:', puid)
    console.log('from User:', uid);
    console.log(this.getAllChats());
  }

  async getAllChats() {
    try {
      const chatRef = collection(this.firestore, 'chats');
      const q = query(chatRef, orderBy('timestamp'));
  
      const snapshot = await getDocs(q);
  
      const chat: any = [];
  
      snapshot.forEach((doc) => {
        const chatData = doc.data();
        const chatId = doc.id;
        chat.push({ id: chatId, ...chatData });
      });
  
      return chat;
    } catch (error) {
      console.log('Error retrieving Chat:', error);
      return [];
    }
  }

  // =========== EDIT FOR CHAT =============
  /* addUser(userId: any) {
    const avatarNr = Math.floor(Math.random() * 24)+1;
    this.user.guest = false;
    this.user.photo = `assets/img/avatar/avatar${avatarNr}.png`;
    
    const collectionInstance = collection(this.firestore, 'users');
    const documentRef = doc(collectionInstance, userId);
    setDoc(documentRef, this.user.toJSON()).then((result: any) => {})
    .catch((error: any) => {
      console.error('User add ERROR:', error);
    });
  } */

  /* async getUser(uid: string): Promise<any> {
    const docRef = doc(this.firestore, 'users', `${uid}`);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('User not exist');
      return null;
    }
  } */

}
