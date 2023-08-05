import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, doc, getDoc, getDocs, 
  orderBy, query, setDoc, where } from '@angular/fire/firestore';
import { Chat } from 'src/models/chat.class';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: Firestore) { }

  async openChat(uid: string, puid: string) {
    const chat = await this.getChatWithIds(uid, puid);

    if(chat) {
      console.log('open chat', chat.id);
    } else {
      this.createChat(uid, puid);
    }
  }

  async createChat(uid: string, puid: string) {
    const newChat = new Chat({
      person1Id: uid,
      person2Id: puid
    });

    const chatDocRef = doc(this.firestore, 'chats', uid+puid);

    try {
      await setDoc(chatDocRef, newChat.toJSON());
      //console.log('Successfully create Chat with ID:', uid+puid);
    } catch (error) {
      console.error('Error while creating Chat:', error);
    }
  }

  async getChatWithIds(id1: string, id2: string) {
    const documentRef1 = doc(this.firestore, 'chats', id1 + id2);
    const documentRef2 = doc(this.firestore, 'chats', id2 + id1);
  
    try {
      const docSnapshot1 = await getDoc(documentRef1);
      if (docSnapshot1.exists()) {
        console.log('Document-ID:', docSnapshot1.id, 'Documentdata:', docSnapshot1.data());
        return { id: docSnapshot1.id, data: docSnapshot1.data() };
      }
  
      const docSnapshot2 = await getDoc(documentRef2);
      if (docSnapshot2.exists()) {
        console.log('Document-ID:', docSnapshot2.id, 'Documentdata:', docSnapshot2.data());
        return { id: docSnapshot2.id, data: docSnapshot2.data() };
      }
  
      console.log('Chat with ID', id1+id2, 'or with ID', id2+id1, 'not found');
      return null;
    } catch (error) {
      console.error('Error while retrieving chat with IDs:', error);
      return null;
    }
  }

  async getAllChatsByUserId(userId: string) {
    const chatsCollection = collection(this.firestore, 'chats');

    const querySnapshot = await getDocs(chatsCollection);
    const chats: any[] = [];

    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      if (docId.startsWith(userId) || docId.endsWith(userId)) {
        chats.push(doc.data());
      }
    });
   
    return chats;
  }

}
