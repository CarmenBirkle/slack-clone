import { EventEmitter, Injectable, Output } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  errorMsg = null;
  @Output() isLogout = new EventEmitter<void>();

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
        this.checkSessionTokenWithUser(user.uid);
      })
      .catch((error) => {
        /* const errorCode = error.code;
        const errorMessage = error.message; */
        this.errorMsg = error;
      });
  }

  checkSessionTokenWithUser(userId: string) {
    const token = this.generateRandomToken(64);
    this.saveTokenToLocalStorage(token);
  }

  generateRandomToken(length: number): string {
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:!_-=+(*)[]{}/?|@#$%^&~`;
    let token = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    
    return token;
  }
  
  saveTokenToLocalStorage(token: string): void {
    localStorage.setItem('sessionToken', token);
  }
  
  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('sessionToken');
  }
  
  removeTokenFromLocalStorage(): void {
    localStorage.removeItem('sessionToken');
  }
}
