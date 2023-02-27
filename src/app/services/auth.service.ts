
import { Injectable } from '@angular/core'
import { Auth, signOut } from '@angular/fire/auth';import { docData, Firestore } from '@angular/fire/firestore';
;
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup, User, onAuthStateChanged, getAuth } from '@firebase/auth';
import { addDoc, collection, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  id?:any;
  email?: string;
  Nivel?: number;

  constructor(
    private auth: Auth,
    private firestore: Firestore
    ) { }

  async register(data: {email: string, password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      return user
    } catch (error) {
      return null;
    }
  }

  async login(data: {email: string, password: string}) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      return user
    } catch (error) {
      return null;
    }
  }

  async googleLoginWeb() {
    try {
      const user = await signInWithRedirect(this.auth, new GoogleAuthProvider())
      return user
    } catch (error) {
      return null;
    }
  }

  logout() {
  return signOut(this.auth);
  }

  getUserProfile() {

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

}
}
