import { EventEmitter, Injectable, Output } from '@angular/core';
import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, 
  reauthenticateWithCredential, signOut, sendEmailVerification, sendPasswordResetEmail, 
  signInWithEmailAndPassword, updateEmail, updatePassword} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMsg = null;
  @Output() isLogout = new EventEmitter<void>();

  constructor() { }

  async sigup(email: string, password: string): Promise<string | null> {
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      this.emailVerification();
      return user.uid;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error during sign up:', errorMessage);
      return null;
    }
  }

  async signin(email: string, password: string) {
    this.errorMsg = null;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log('user signed in:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorMsg = error;
      });
  }

  async signout() {
    const auth = getAuth();
    await signOut(auth);
  }

  async subAuthState():Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const uid = user.uid;
        } // else User is signed out

        resolve();
      });
    });
  }

  async checkAuthUser(): Promise<boolean> {
    await this.subAuthState();

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      //console.log('User', user);
      
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      return false;
    }
  }

  async checkEmailVerification(): Promise<boolean> {
    await this.subAuthState();

    const auth = getAuth();
    const user = auth.currentUser;

    return user?.emailVerified || false;
  }

  emailVerification() {
    const auth = getAuth();
    const user = auth.currentUser;

    if(user) {
      sendEmailVerification(user)
        .then(() => {
          // Email verification sent!
        })
        .catch((error) => {
          console.error('Error sending email verification:', error);
        });
    }
  }

  getEmail() {
    const auth = getAuth();
    const user = auth.currentUser;

    return user?.email;
  }

  sendPasswordResetEmail(email: string) {
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
        console.log('Error sending password reset email:', error);
      });
  }

  getUserId() {
    const auth = getAuth();
    const user = auth.currentUser;

    return user?.uid;
  }

  async changeEmail(newEmail: string, password: string) {
    const auth = getAuth();
    const user: any = auth.currentUser;

    if (user) {
      try {
        await updateEmail(user, newEmail);
      } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          try {
            // Reauthenticate the user with their current credentials
            const emailCredential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, emailCredential);
            
            // Update the email address again
            await updateEmail(user, newEmail);
          } catch (error) {
            console.log('Error updating email:', error);
          }
        } else {
          console.log('Error updating email:', error);
        }
      }
    } else {
      console.log('User is not signed in');
    }
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const auth = getAuth();
    const user: any = auth.currentUser;

    if (user) {
      try {
        await updatePassword(user, newPassword);
      } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          try {
            // Reauthenticate the user with their current credentials
            const emailCredential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, emailCredential);
            
            // Update password again
            await updatePassword(user, newPassword);
          } catch (error) {
            console.log('Error changing password:', error);
          }
        } else {
          console.log('Error changing password:', error);
        }
      }
    } else {
      console.log('User is not signed in');
    }
  }
}
