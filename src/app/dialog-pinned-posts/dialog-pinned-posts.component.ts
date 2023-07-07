import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-pinned-posts',
  templateUrl: './dialog-pinned-posts.component.html',
  styleUrls: ['./dialog-pinned-posts.component.scss'],
})
export class DialogPinnedPostsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { channelId: string },
    private firestore: Firestore
  ) {}
}
