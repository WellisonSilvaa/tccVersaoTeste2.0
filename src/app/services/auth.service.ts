
import { Injectable } from '@angular/core'
import { Auth, signOut } from '@angular/fire/auth';;
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

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

  logout() {
  return signOut(this.auth);
  }

}
