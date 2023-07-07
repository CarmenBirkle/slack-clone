import { Component, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
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
  reactions: any[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.firestore = getFirestore();
    // this.getReactions();
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
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['post'] && this.post) {
  //     console.log('Post ID: ', this.post.id);

  //     if (this.post.reaction && this.post.reaction.length > 0) {
  //       this.post.reaction.forEach((reactionId) => {
  //         console.log('Reaction ID: ', reactionId);
  //         this.getReactionData(reactionId);
  //       });
  //     }
  //   }
  // }

  // async getReactionData(reactionId: string) {
  //   const docRef = doc(this.firestore, 'reactions', reactionId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log(`Reaction data for ID ${reactionId}: `, docSnap.data());
  //   } else {
  //     console.log(`No document found for reaction ID ${reactionId}`);
  //   }
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && this.post) {
      console.log('Post ID: ', this.post.id);
      this.reactions = []; // Reset reaction data for new post
      this.emojiCounts = new Map(); // Initialize emoji counts map

      if (this.post.reaction && this.post.reaction.length > 0) {
        const reactionsPromises = this.post.reaction.map((reactionId) =>
          this.getReactionData(reactionId)
        );
        Promise.all(reactionsPromises).then(() => {
          console.log('Emoji Counts: ', Array.from(this.emojiCounts.entries()));
        });
      }
    }
  }

  // async getReactionData(reactionId: string) {
  //   const docRef = doc(this.firestore, 'reactions', reactionId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const data = docSnap.data();
  //     this.reactions.push({
  //       id: reactionId,
  //       emoji: data ? data['emoji'] : null, // Hier verwenden wir den Index-Zugriffsoperator
  //     });
  //   } else {
  //     console.log(`No document found for reaction ID ${reactionId}`);
  //   }
  // }
  async getReactionData(reactionId: string) {
    const docRef = doc(this.firestore, 'reactions', reactionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const emoji = data ? data['emoji'] : null;

      this.reactions.push({
        id: reactionId,
        emoji: emoji,
      });

      // Update the count of emoji in the map
      if (emoji) {
        // Ensure that emoji is not null or undefined
        if (this.emojiCounts.has(emoji)) {
          this.emojiCounts.set(emoji, this.emojiCounts.get(emoji)! + 1);
        } else {
          this.emojiCounts.set(emoji, 1);
        }
      }
    } else {
      console.log(`No document found for reaction ID ${reactionId}`);
    }
  }

  removeDuplicates(originalArray: any[], key: string): any[] {
    return [
      ...new Map(originalArray.map((item) => [item[key], item])).values(),
    ];
  }
}
