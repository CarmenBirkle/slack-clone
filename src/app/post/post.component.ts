import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Post } from './../../models/post.class';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;
  showThreadContent: boolean = false;
  showHeader: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

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
}
