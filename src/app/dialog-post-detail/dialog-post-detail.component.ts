import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-dialog-post-detail',
  templateUrl: './dialog-post-detail.component.html',
  styleUrls: ['./dialog-post-detail.component.scss'],
})
export class DialogPostDetailComponent {
  public post: any;
  public replies: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogPostDetailComponent>,
    private firestore: Firestore
  ) {
    console.log('postId:', data.postId);
    console.log('postData:', data.postData);
    this.post = data.postData;
    console.log('this.post:', this.post);
    console.log('this.post.message:', this.post.message);
    console.log('this.post.replay:', this.post.replay);
    this.getReplies();
  }


  async getReplies() {
    for (let replyId of this.post.replay) {
      console.log('Getting reply with ID:', replyId); 
      let docRef = doc(this.firestore, 'replys', replyId);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Found reply:', docSnap.data()); 
        this.replies.push(docSnap.data());
      } else {
        console.log('No reply found with ID:', replyId); 
    }
    console.log('Replies:', this.replies);
  }
}

 

  closeDialog() {
    this.dialogRef.close();
  }
}
