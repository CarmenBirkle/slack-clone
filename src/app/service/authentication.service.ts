import { EventEmitter, Injectable, Output } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInAnonymously, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;
  errorMsg = null;
  @Output() isLogout = new EventEmitter<void>();

  async sigup(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user, 'signed up');
      
      this.isLoggedIn = true;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  async signin(email: string, password: string) {
    this.errorMsg = null;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, 'logged in');
        this.isLoggedIn = true;
      })
      .catch((error) => {
        /* const errorCode = error.code;
        const errorMessage = error.message; */
        this.errorMsg = error;
      });
  }
}
