export class User {
    username: string;
    email: string;
    //phone: string;
    photo: string;
    guest: boolean;
    "bookmarked-posts": Array<string>;
    
    constructor(obj?: any) {
        this.username = obj ? obj.username : '';
        this.email = obj ? obj.email : '';
        //this.phone = obj ? obj.phone : '';
        this.photo = obj ? obj.photo : '';
        this.guest = obj ? obj.guest : '';
        this["bookmarked-posts"] = obj ? obj["bookmarked-posts"] : [];
    }

    public toJSON() {
        return {
            username: this.username,
            email: this.email,
            //phone: this.phone,
            photo: this.photo,
            guest: this.guest,
            "bookmarked-posts": this["bookmarked-posts"]
        }
      }
}