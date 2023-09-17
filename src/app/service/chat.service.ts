import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, 
  setDoc } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Chat } from 'src/models/chat.class';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /* allChats: Observable<any[]>; */
  private allChatsSubscription: Subscription | undefined;
  
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
        const chatData = doc.data();
        chatData['id'] = doc.id;
        chats.push(chatData);
        //chats.push(doc.data(), doc.id);
        /* console.log('data:', doc.data());
        console.log('id:', doc.id); */
        
      }
      console.log('chat aktuallisiert!');
      
    });
   
    return chats;
  }

  /* getAllChats() {
    // Firestore-Referenz erstellen
    const chatsCollection = collection(this.firestore, 'chats');

    // Abonnement auf die Firestore-Abfrage
    this.allChatsSubscription = chatsCollection.valueChanges().subscribe((chats: any[]) => {
      this.allChats = chats;
      console.log('Alle Chats:', this.allChats);
    });
  } */

}
