
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { doc, onSnapshot } from 'firebase/firestore';
import { Channel } from '../../models/channel.class';
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { DialogDeleteChannelComponent } from '../dialog-delete-channel/dialog-delete-channel.component';



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

  // editChannel(channelId: string) {
  //   const dialog = this.openDialog(
  //     'enterAnimationDurationValue',
  //     'exitAnimationDurationValue'
  //   );
  //   dialog.componentInstance.channel = new Channel(this.channel.toJson());
  //   dialog.componentInstance.channelId = channelId;
  // }

  // editChannel() {
  //   const dialog = this.openDialog(
  //     'enterAnimationDurationValue',
  //     'exitAnimationDurationValue',
  //     channelId
  //   );
  //   dialog.componentInstance.channel = new Channel(this.channel.toJson());
  // }

  deleteChannel() {}
}

