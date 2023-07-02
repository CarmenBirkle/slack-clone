import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Post } from './../../models/post.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEmojiPickerComponent } from '../dialog-emoji-picker/dialog-emoji-picker.component';
import {  getDoc, doc, query, where } from 'firebase/firestore';
import { Firestore, getFirestore, collection } from 'firebase/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;
  showThreadContent: boolean = false;
  showHeader: boolean = false;
  emojiCounts: Map<string, number> = new Map();
  private firestore: Firestore;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.firestore = getFirestore();
    this.getReactions();
  }

  get dateString(): string {
    if (this.post) {
      const date = new Date(this.post.timestamp);
      return date.toLocaleDateString();
    }
    return '';
  }

  get timeString(): string {
    if (this.post) {
      const date = new Date(this.post.timestamp);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return '';
  }

  showThread() {
    this.showThreadContent = true;
    this.changeDetectorRef.detectChanges();
  }

  hideThread() {
    this.showThreadContent = false;
    this.changeDetectorRef.detectChanges();
  }

  checkShowHeader(previousPost?: Post) {
    if (previousPost && this.post) {
      const previousDate = new Date(
        previousPost.timestamp
      ).toLocaleDateString();
      const currentDate = new Date(this.post.timestamp).toLocaleDateString();
      this.showHeader = previousDate !== currentDate;
    }
  }

  openIconDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): MatDialogRef<DialogEmojiPickerComponent> {
    return this.dialog.open(DialogEmojiPickerComponent, {
      width: '343px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { postId: this.post.id },
    });
  }

  // async getReactions() {
  //   const q = query(
  //     collection(this.firestore, 'reactions'),
  //     where('postId', '==', this.post.id)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data() as any;
  //     if (data['emoji']) {
  //       if (this.emojiCounts.has(data['emoji'])) {
  //         this.emojiCounts.set(
  //           data['emoji'],
  //           this.emojiCounts.get(data['emoji'])! + 1
  //         );
  //       } else {
  //         this.emojiCounts.set(data['emoji'], 1);
  //       }
  //     }
  //   });

  // }

  async getReactions() {
    try {
      if (!this.post || !this.post.reaction) {
        console.log('No post or reaction data available');
        return;
      }

      console.log('Fetching reactions...');

      for (const reactionId of this.post.reaction) {
        const reactionDoc = doc(this.firestore, 'reactions', reactionId);
        const reactionDocSnap = await getDoc(reactionDoc);

        if (reactionDocSnap.exists()) {
          const reactionData = reactionDocSnap.data() as any;
          const emoji = reactionData?.emoji as string;
          if (emoji) {
            if (this.emojiCounts.has(emoji)) {
              this.emojiCounts.set(emoji, this.emojiCounts.get(emoji)! + 1);
            } else {
              this.emojiCounts.set(emoji, 1);
            }
          }
        } else {
          console.log(`Reaction document with ID ${reactionId} does not exist`);
        }
      }

      console.log('Reactions fetched successfully');
    } catch (error) {
      console.error('Error retrieving reactions: ', error);
    }
  }
}
