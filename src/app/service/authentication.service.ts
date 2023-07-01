import { EventEmitter, Injectable, Output } from '@angular/core';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, onAuthStateChanged,
   sendEmailVerification,
   sendPasswordResetEmail,
   signInWithEmailAndPassword } from '@angular/fire/auth';

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
        console.log('user signed in:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorMsg = error;
      });
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
      console.log('User', user);
      
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
}
