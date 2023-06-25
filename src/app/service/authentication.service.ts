import { EventEmitter, Injectable, Output } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMsg = null;
  @Output() isLogout = new EventEmitter<void>();

  constructor() {
    this.subAuthState();
  }

  async sigup(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user, 'signed up');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  async signin(email: string, password: string) {
    this.errorMsg = null;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, 'logged in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorMsg = error;
      });
  }

  async subAuthState() {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log('user is signed in:', user);
      } else {
        // User is signed out
        console.log('nobody is signed in.');
      }

      this.checkAuthUser();
    });
  }

  checkAuthUser() {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log('user:', user);
    

    if (user) {
      // User is signed in, see docs for a list of available properties
      console.log('redirect to home');
      window.location.href="/";
    } else {
      // No user is signed in.
      console.log('go to sign-in');
    }
  }
}
