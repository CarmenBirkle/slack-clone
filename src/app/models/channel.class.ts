export class channel {
  channelName: string;
  channelPosts: string[] = [];
  authorizedUser: string[] = [];

  constructor(obj?: any) {
    this.channelName = obj ? obj.channelName : '';
    this.channelPosts = obj ? obj.channelPosts : [];
    this.authorizedUser = obj ? obj.authorizedUser : [];
  }

  public toJson() {
    return {
      channelName: this.channelName,
      channelPosts: this.channelPosts,
      authorizedUser: this.authorizedUser,
    };
  }
}
