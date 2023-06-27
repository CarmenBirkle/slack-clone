import { EventEmitter, Injectable, Output } from '@angular/core';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, onAuthStateChanged,
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
        } else {
          // User is signed out
        }

        resolve();
      });
    });
  }

  async checkAuthUser():Promise<boolean> {
    await this.subAuthState();

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      return false;
    }
  }
}
