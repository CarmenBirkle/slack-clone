export class User {
    username: string;
    /* email: string;
    phone: string;
    picture: string; */
    guest: boolean;
    sessionToken: {
        token: string,
        created: number
    }
    
    constructor(obj?: any) {
        this.username = obj ? obj.username : '';
        /* this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
        this.picture = obj ? obj.picture : ''; */
        this.guest = obj ? obj.guest : '';
        this.sessionToken = obj ? obj.sessionToken : null;
    }

    public toJSON() {
        return {
            username: this.username,
            /* email: this.email,
            phone: this.phone,
            picture: this.picture, */
            guest: this.guest,
            sessionToken: this.sessionToken,
        }
      }
}