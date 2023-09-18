
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
import { AuthenticationService } from '../service/authentication.service';
import {
  collection,
  query,
  where,
  getDoc,

  DocumentSnapshot,
} from 'firebase/firestore';
import { LoadingService } from './../service/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { DialogPinnedPostsComponent } from '../dialog-pinned-posts/dialog-pinned-posts.component';
import { Chat } from 'src/models/chat.class';


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
  pinCount: number = 0;
  isThreadView: boolean = false;
  isGuest: boolean = false;
  directMessages: Chat[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog,
    public loadingService: LoadingService,
    private cd: ChangeDetectorRef,
    public authentication: AuthenticationService
  ) {}

  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.channelId = params['id'];
  //     const currentUser = this.authentication.getUserId();
  //     // const currentUser = 'hKhYyf1A2qOwLSyxTymq';
  //     //TODO currentuser nicht hardcoded
  //     console.log('Aktuell angemeldeter Benutzer aus chat:', currentUser);
  //     this.getPinnedPostCount();
  //     this.getCurrentUserData(currentUser);
  //   });

  //   this.route.url.subscribe((segments) => {
  //     this.isThreadView = segments.some((segment) => segment.path === 'thread');
  //     if (this.isThreadView) {
  //       this.getUserPosts();
  //     } else {
  //       this.getChannel();
  //     }
  //   });
  // }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      const currentUser = this.authentication.getUserId();
      console.log('Aktuell angemeldeter Benutzer aus chat:', currentUser);
      this.getPinnedPostCount();
      this.getCurrentUserData(currentUser);
    });

    this.route.url.subscribe((segments) => {
      // Check for "dm" path in the URL
      const isDMView = segments.some((segment) => segment.path === 'dm');

      this.isThreadView = segments.some((segment) => segment.path === 'thread');

      if (isDMView) {
        // Call the method to fetch DMs
        console.log('DM View aus Init', isDMView);
        this.getDirectMessage();
      } else if (this.isThreadView) {
        this.getUserPosts();
      } else {
        this.getChannel();
      }
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
      console.log(this.channel.channelType);
      this.getPosts();
    });
  }

  // getDirectMessage() {
  //   console.log('DM aufgerufen');
  //   console.log('Abruf der Direktnachricht für channelId:', this.channelId);

  //   // Assuming the DMs are stored in a collection named 'directMessages' and are identifiable by channelId
  //   const dmRef = doc(this.firestore, 'chats', this.channelId);
  //   onSnapshot(dmRef, (docSnap) => {
  //     if (docSnap.exists()) {
  //       console.log('Direktnachricht:', docSnap.data());
  //     }
  //   });
  // }

  getDirectMessage() {
    console.log('DM aufgerufen');
    console.log('Abruf der Direktnachricht für channelId:', this.channelId);

    const dmRef = doc(this.firestore, 'chats', this.channelId);
    onSnapshot(dmRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log('Direktnachricht:', docSnap.data());

        // Convert the data to a Chat instance and save it in directMessages
        const chat = new Chat(docSnap.data());
        this.directMessages.push(chat);
      }
    });
  }

  getPosts() {
    this.unsubscribePosts && this.unsubscribePosts();
    const postsRef = collection(this.firestore, 'posts');
    this.unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
      this.processQuerySnapshot(querySnapshot);
    });
  }

  getUserPosts() {
    this.unsubscribePosts && this.unsubscribePosts();
    const postsRef = collection(this.firestore, 'posts');
    const currentUser = this.authentication.getUserId();
    const userPostsQuery = query(postsRef, where('author', '==', currentUser));
    this.unsubscribePosts = onSnapshot(userPostsQuery, (querySnapshot) => {
      // console.log('Query snapshot:', querySnapshot);
      // console.log('Document count:', querySnapshot.size);

      this.allPosts = [];
      querySnapshot.forEach((doc) => {
        console.log('Document data:', doc.data());
        this.processDocumentSnapshotThread(doc);
      });
      this.finalizePostProcessing();
    });
  }

  getChannelPosts() {
    this.unsubscribePosts && this.unsubscribePosts();
    const postsRef = collection(this.firestore, 'posts');
    const channelPostsQuery = query(
      postsRef,
      where('channelId', '==', this.channelId)
    );
    this.unsubscribePosts = onSnapshot(channelPostsQuery, (querySnapshot) => {
      this.processQuerySnapshot(querySnapshot);
    });
  }

  getAllPosts(querySnapshot: any) {
    this.allPosts = [];
    querySnapshot.forEach((doc: any) => {
      let postData = doc.data();
      postData['id'] = doc.id;
      const post = new Post(postData);
      this.allPosts.push(post);
      this.hasData = true;
    });
    this.finalizePostProcessing();
  }

  getCurrentUserData(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        this.isGuest =
          userData && userData['guest'] ? userData['guest'] : false;
        console.log('isGuest: ', this.isGuest);
      }
    });
  }

  getSpecificPosts(querySnapshot: any) {
    this.allPosts = [];
    querySnapshot.forEach((doc: any) => {
      this.processDocumentSnapshot(doc);
    });
    this.finalizePostProcessing();
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

  processDocumentSnapshotThread(doc: any) {
    let postData = doc.data();
    postData['id'] = doc.id;
    const post = new Post(postData);
    this.allPosts.push(post);
    this.hasData = true;
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

  //TODO: width adjust to screen size
  openPinnedPostDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): MatDialogRef<DialogPinnedPostsComponent> {
    const pinnedPosts = this.getPinnedPosts();
    const dialogWidth = window.innerWidth < 750 ? '100vw' : '90vw';
    return this.dialog.open(DialogPinnedPostsComponent, {
      // width: dialogWidth,
      width: '100vw',
      height: '100vh',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { pinnedPosts },
      panelClass: 'responsive-dialog',
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
  getPinnedPostCount(): number {
    this.pinCount = this.allPosts.filter((post) => post.pinned).length;
    return this.pinCount;
  }

  getPinnedPosts(): Post[] {
    return this.allPosts.filter((post) => post.pinned);
  }
}


