
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { doc, onSnapshot } from 'firebase/firestore';
import { Channel } from '../models/channel.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  channelId: string = '';
  channel: Channel = new Channel();
  private unsubscribe!: () => void;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      this.getChannel(); 
    });
  }

  getChannel() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    const docRef = doc(this.firestore, 'channels', this.channelId);
    this.unsubscribe = onSnapshot(docRef, (docSnap) => {
      this.channel = new Channel(docSnap.data());
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

