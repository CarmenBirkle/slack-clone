
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc, onSnapshot } from 'firebase/firestore';
import { Channel } from '../../models/channel.class';
import { Post } from 'src/models/post.class';
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { DialogDeleteChannelComponent } from '../dialog-delete-channel/dialog-delete-channel.component';
import { get } from '@angular/fire/database';
import {
  collection,
  query,
  where,
  getDoc,

  DocumentSnapshot,
} from 'firebase/firestore';
import { LoadingService } from './../service/loading.service';
  import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  channelId: string = '';
  channel: Channel = new Channel();
  post: Post = new Post();
  allPosts: Post[] = [];
  postId: string = '';
  hasData: boolean = false;
  private unsubscribeChannel!: () => void;
  private unsubscribePosts!: () => void;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog,
    public loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      this.getChannel();
    });
  }
  ngOnDestroy() {
    this.unsubscribeChannel && this.unsubscribeChannel();
    this.unsubscribePosts && this.unsubscribePosts();
  }

  /**
   * Start the loading animation, from the loadingService
   */
  startLoading() {
    this.loadingService.setLoadingState(true);
  }

  /**
   * Stop the loading animation, from the loadingService
   */
  stopLoading() {
    this.loadingService.setLoadingState(false);
  }

  getChannel() {
    // this.startLoading();
    this.unsubscribeChannel && this.unsubscribeChannel();

    const docRef = doc(this.firestore, 'channels', this.channelId);
    this.unsubscribeChannel = onSnapshot(docRef, (docSnap) => {
      this.channel = new Channel(docSnap.data());
      console.log(this.channel);
      this.getPosts();
    });
  }

  // getPosts() {
  //   this.unsubscribePosts && this.unsubscribePosts();
  //   const postsRef = collection(this.firestore, 'posts');
  //   this.unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
  //     this.allPosts = [];
  //     querySnapshot.forEach((doc) => {
  //       let postData = doc.data();
  //       postData['id'] = doc.id;
  //       const post = new Post(postData);
  //       if (this.channel.channelPosts.includes(post.id)) {
  //         this.allPosts.push(post);
  //         this.hasData = true;
  //       }
  //     });
  //     if (this.hasData) {
  //       this.sortPosts();
  //       console.log('all posts: ', this.allPosts);
  //       this.stopLoading();
  //       this.cd.detectChanges();
  //     }
  //     //TODO console.log delete
  //     this.stopLoading();
  //   });
  // }

  getPosts() {
    this.unsubscribePosts && this.unsubscribePosts();
    const postsRef = collection(this.firestore, 'posts');
    this.unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
      this.processQuerySnapshot(querySnapshot);
    });
  }

  processQuerySnapshot(querySnapshot: any) {
    this.allPosts = [];
    querySnapshot.forEach((doc: any) => {
      this.processDocumentSnapshot(doc);
    });
    this.finalizePostProcessing();
  }

  processDocumentSnapshot(doc: any) {
    let postData = doc.data();
    postData['id'] = doc.id;
    const post = new Post(postData);
    if (this.channel.channelPosts.includes(post.id)) {
      this.allPosts.push(post);
      this.hasData = true;
    }
  }

  finalizePostProcessing() {
    if (this.hasData) {
      this.sortPosts();
      console.log('all posts: ', this.allPosts);
      this.stopLoading();
      this.cd.detectChanges();
    } else {
      this.stopLoading();
    }
  }

  sortPosts() {
    this.allPosts.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
  }

  openEditDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): MatDialogRef<DialogEditChannelComponent> {
    return this.dialog.open(DialogEditChannelComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { channelId: this.channelId },
    });
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): MatDialogRef<DialogDeleteChannelComponent> {
    return this.dialog.open(DialogDeleteChannelComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { channelId: this.channelId },
    });
  }

  getPreviousPost(currentPost: Post): Post | undefined {
    const currentIndex = this.allPosts.indexOf(currentPost);
    if (currentIndex > 0) {
      return this.allPosts[currentIndex - 1];
    }
    return undefined;
  }

  shouldShowDate(previousPost: Post | undefined, currentPost: Post): boolean {
      if (previousPost && currentPost) {
      const previousDate = new Date(
        previousPost.timestamp
      ).toLocaleDateString();
      const currentDate = new Date(currentPost.timestamp).toLocaleDateString();
      return previousDate !== currentDate;
    }
    return false;
  }
}

