import { Auth, user } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { collection, CollectionReference, doc } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { docData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private auth: Auth
    ) { }

    
}
