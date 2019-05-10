import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  private signInWithEmail({ email, password }): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private signInWithPopup(provider: string): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case 'facebook':
        signInProvider = new auth.FacebookAuthProvider();
        break;
    }

    return this.angularFireAuth.auth.signInWithPopup(signInProvider);
  }
}
