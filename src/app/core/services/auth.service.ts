import { User, AuthProvider, AuthOptions } from './auth.types';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  authenticate({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    } else {
      operation = isSignIn ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }

    return operation;
  }

  private signInWithEmail({ email, password }: User): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password, name }: User): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private signInWithPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;
    }

    return this.angularFireAuth.auth.signInWithPopup(signInProvider);
  }
}
