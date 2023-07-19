import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-post-detail',
  templateUrl: './dialog-post-detail.component.html',
  styleUrls: ['./dialog-post-detail.component.scss'],
})
export class DialogPostDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogPostDetailComponent>
  ) {
    console.log('postId:', data.postId);
    console.log('postData:', data.postData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
