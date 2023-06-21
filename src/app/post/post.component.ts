import { Component, Input } from '@angular/core';
import { Post } from './../../models/post.class';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;

  get dateString(): string {
    if (this.post) {
      const date = new Date(this.post.timestamp);
      return date.toLocaleDateString();
    }
    return '';
  }
}
