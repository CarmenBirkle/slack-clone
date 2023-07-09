export class User {
    username: string;
    email: string;
    //phone: string;
    picture: string;
    guest: boolean;
    "bookmarked-posts": Array<string>;
    
    constructor(obj?: any) {
        this.username = obj ? obj.username : '';
        this.email = obj ? obj.email : '';
        //this.phone = obj ? obj.phone : '';
        this.picture = obj ? obj.picture : '';
        this.guest = obj ? obj.guest : '';
        this["bookmarked-posts"] = obj ? obj["bookmarked-posts"] : [];
    }

    public toJSON() {
        return {
            username: this.username,
            email: this.email,
            //phone: this.phone,
            picture: this.picture,
            guest: this.guest,
            "bookmarked-posts": this["bookmarked-posts"]
        }
      }
}