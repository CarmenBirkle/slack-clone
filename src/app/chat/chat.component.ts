
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
  private unsubscribeChannel!: () => void;
  private unsubscribePosts!: () => void;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      this.getChannel();
      this.getPosts();
    });
  }

  getChannel() {
    if (this.unsubscribeChannel) {
      this.unsubscribeChannel();
    }
    const docRef = doc(this.firestore, 'channels', this.channelId);
    this.unsubscribeChannel = onSnapshot(docRef, (docSnap) => {
      this.channel = new Channel(docSnap.data());
      console.log(this.channel);
    });
  }

  getPosts() {
    if (this.unsubscribePosts) {
      this.unsubscribePosts();
    }

    const postsRef = collection(this.firestore, 'posts');

    this.unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
      const posts: Post[] = [];
      querySnapshot.forEach((doc) => {
        let postData = doc.data();
        postData['id'] = doc.id;
        const post = new Post(postData);
        this.allPosts.push(post);
      });

      console.log('all posts: ', this.allPosts);
    });
  }

  ngOnDestroy() {
    if (this.unsubscribeChannel) {
      this.unsubscribeChannel();
    }
    if (this.unsubscribePosts) {
      this.unsubscribePosts();
    }
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
}

