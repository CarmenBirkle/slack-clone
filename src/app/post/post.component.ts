import { Component, Input, ChangeDetectorRef, SimpleChanges, NgModule } from '@angular/core';
import { Post } from './../../models/post.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEmojiPickerComponent } from '../dialog-emoji-picker/dialog-emoji-picker.component';
import { AuthenticationService } from '../service/authentication.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { Firestore, getFirestore, collection } from 'firebase/firestore';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DialogPostDetailComponent } from '../dialog-post-detail/dialog-post-detail.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;
  private firestore: Firestore;
  showThreadContent: boolean = false;
  showHeader: boolean = false;
  emojiCounts: Map<
    string,
    { count: number; users: { userId: string; reactionId: string }[] }
  > = new Map();
  reactions: any[] = [];
  isBookmarked: boolean = false;
  isPinned: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public authentication: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.firestore = getFirestore();
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

  //TODO Cleancode kürzen
  async getReactionData(reactionId: string) {
    console.log('getReactionData() aufgerufen. Reaction ID: ', reactionId);
    const docRef = doc(this.firestore, 'reactions', reactionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Erhaltene Reaktionsdaten:', data);
      const emoji = data ? data['emoji'] : null;
      const userId = data ? data['userId'] : null;

      this.reactions.push({
        id: reactionId,
        emoji: emoji,
        userId: userId,
      });

      if (emoji) {
        if (this.emojiCounts.has(emoji)) {
          const countObj = this.emojiCounts.get(emoji);
          if (countObj) {
            countObj.count += 1;
            countObj.users.push({ userId: userId, reactionId: reactionId });
          }
          console.log('oben', this.emojiCounts);
        } else {
          this.emojiCounts.set(emoji, {
            count: 1,
            users: [{ userId: userId, reactionId: reactionId }],
          });
          console.log('unten', this.emojiCounts);
        }
      }

      this.changeDetectorRef.detectChanges();
    } else {
      // reaction not found
    }
  }

  //TODO entfernen
  // logReactionData(reaction: any) {
  //   console.log(reaction);
  // }

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

  //TODO: Cleancode kürzen
  async removeEmoji(
    reactionId: string,
    users: { userId: string; reactionId: string }[]
  ) {
    const currentUser = this.authentication.getUserId();
    // const currentUser = 'DcMndLPXmVM2HWVyrKYteG6b2Lg1';

    const user = users.find((user) => user.userId === currentUser);
    if (user) {
      console.log('Reaction ID:', user.reactionId);
      try {
        const docRef = doc(this.firestore, 'reactions', user.reactionId);
        await deleteDoc(docRef);
        console.log('Icon erfolgreich gelöscht.');
        this.reloadPostData();
        this.showDeleteMsg('Emoji deleted');
      } catch (error) {
        console.error('Fehler beim Löschen des Icons:', error);
        this.showDeleteMsg('Error deleting emoji');
      }
    } else {
      this.showDeleteMsg("You can't delete this emoji, it's not yours");
    }
  }

  reloadPostData() {
    this.ngOnChanges({
      post: {
        currentValue: this.post,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
  }
  showDeleteMsg(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  openPostDetailDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): MatDialogRef<DialogPostDetailComponent> {
    return this.dialog.open(DialogPostDetailComponent, {
      width: '90vw',
      // width: '343px',
      // height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { postId: this.post.id, postData: this.post },
    });
  }
}







// User-ID Carmen DcMndLPXmVM2HWVyrKYteG6b2Lg1;



