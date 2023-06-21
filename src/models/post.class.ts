/**
 * @fileoverview Post class to create new Post objects.
 * Post objects are used to create new posts in a channel.
 */

export class Post {
  id: string;
  author: string;
  timestamp: Date;
  message: string;
  replay: string[] = [];
  reaction: string[] = [];
  pinned: boolean;


  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.author = obj ? obj.author : '';
    this.timestamp = obj && obj.timestamp ? new Date(obj.timestamp) : new Date();
    this.message = obj ? obj.message : '';
    this.replay = obj ? obj.channelPosts : [];
    this.reaction = obj ? obj.channelPosts : [];
    this.pinned = obj ? obj.pinned : false;
  }

  public toJson() {
    return {
      id: this.id,
      author: this.author,
      timestamp: this.timestamp,
      message: this.message,
      replay: this.replay,
      reaction: this.reaction,
      pinned: this.pinned,
    };
  }
}
