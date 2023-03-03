import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core'
import { Auth, signOut, user } from '@angular/fire/auth';import { docData, Firestore } from '@angular/fire/firestore';
;
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect, signInWithPopup, User, onAuthStateChanged, getAuth } from '@firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCreateId: any;
  userCreateEmail: any;
  userIdLogin: any;
  userprofile: any = {};

  constructor(
    private auth: Auth,
    private firestore: Firestore
    ) { }

  async register(data: {email: string, password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password,

      );
        this.userCreateId = user.user.uid;
        this.userCreateEmail = user.user.email;
        this.userIdLogin = user.user.uid;

        console.log(this.userCreateId, this.userCreateEmail);
        this.userCreate();
        this.userLogin();

      return user
    } catch (error) {
      return null;
    }
  }
  // Método de Insert no Banco com Dados do Autentication --->
    async userCreate() {
      try {

        const userId = this.userCreateId
        const name = 'Usuario'
      const email = this.userCreateEmail;
      const nivel = 0;

      const userDocRef = doc(this.firestore, `users/${userId}`);
      await setDoc(userDocRef, {
        email,
        nivel
      })
      } catch (error) {

      }
    }
    // Fim do Metodo Insert no Banco <--------


  async login(data: {email: string, password: string}) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      this.userIdLogin = "";
      this.userIdLogin = user.user.uid;
      this.userLogin();

      return user
    } catch (error) {
      return null;
    }
  }

   // Método de Loign e Return no Banco  --->
   userLogin() {

      const userId = this.userIdLogin;

    const userDocRef = doc(this.firestore, `users/${userId}`);
    return docData(userDocRef);

  }
 // Fim do Metodo de Login no Banco <--------

  async googleLoginWeb() {
    try {
      const user = await signInWithRedirect(this.auth, new GoogleAuthProvider())
      return user
    } catch (error) {
      return null;
    }
  }

  //Login Google Android/Ios
  async googleSignup() {
    try {
      const googleUser = await GoogleAuth.signIn();
      return googleUser
    } catch (error) {
      return null;
    }
  }


  logout() {
  return signOut(this.auth);
  }


// ----------> Método de trazer o Usuário <------------ //
    getUserProfile() {

      const auth = getAuth();
      const user = auth.currentUser;

      this.userprofile = user;

      const userDocRef = doc(this.firestore, `users/${this.userprofile.uid}`);
      return docData(userDocRef);


    }
}
