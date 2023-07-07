import { Component, Input, ChangeDetectorRef, SimpleChanges, NgModule } from '@angular/core';
import { Post } from './../../models/post.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEmojiPickerComponent } from '../dialog-emoji-picker/dialog-emoji-picker.component';
import { AuthenticationService } from '../service/authentication.service';
import {
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { Firestore, getFirestore, collection } from 'firebase/firestore';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
  isBookmarked: boolean = false;
  isPinned: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public authentication: AuthenticationService
  ) {
    this.firestore = getFirestore();
    // this.getReactions();
  }

  ngOnInit() {
    const currentUser = this.authentication.getUserId();
    console.log('Aktuell angemeldeter Benutzer aus post:', currentUser);
    this.checkPinnedStatus();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && this.post) {
      console.log('Post ID: ', this.post.id);
      this.reactions = [];
      this.emojiCounts = new Map();
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
      if (emoji) {
        if (this.emojiCounts.has(emoji)) {
          this.emojiCounts.set(emoji, this.emojiCounts.get(emoji)! + 1);
        } else {
          this.emojiCounts.set(emoji, 1);
        }
      }
      this.changeDetectorRef.detectChanges();
    } else {
    }
  }

  removeDuplicates(originalArray: any[], key: string): any[] {
    return [
      ...new Map(originalArray.map((item) => [item[key], item])).values(),
    ];
  }

  //TODO hardcoded user entfernen und dynamisch machen
  async bookmarkPost() {
    const userRef = doc(
      this.firestore,
      'users',
      'DcMndLPXmVM2HWVyrKYteG6b2Lg1'
    ); // Hardcoded user ID
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      if (
        userData &&
        'bookmarked-posts' in userData &&
        userData['bookmarked-posts'].includes(this.post.id)
      ) {
        // Post is already bookmarked, remove it
        await updateDoc(userRef, {
          'bookmarked-posts': arrayRemove(this.post.id),
        });
        this.isBookmarked = false;
      } else {
        // Post is not bookmarked, add it
        await updateDoc(userRef, {
          'bookmarked-posts': arrayUnion(this.post.id),
        });
        this.isBookmarked = true;
      }
      this.changeDetectorRef.detectChanges();
    }
  }

  checkPinnedStatus() {
    this.isPinned = this.post.pinned;
    this.changeDetectorRef.detectChanges();
  }

  updatePinnedStatus() {
    const postRef = doc(this.firestore, 'posts', this.post.id);
    updateDoc(postRef, { pinned: this.post.pinned });
  }

  togglePinnedStatus() {
    this.post.pinned = !this.post.pinned;
    this.updatePinnedStatus();
  }
  getPinIconClass() {
    return this.post.pinned ? 'pinned' : 'unpinned';
  }
}



//TODO: Wenn der User auf das Emoji klickt und es "seins" ist, dann soll es entfernt werden


// User-ID Carmen DcMndLPXmVM2HWVyrKYteG6b2Lg1;
