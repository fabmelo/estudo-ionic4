import { User, AuthProvider, AuthOptions } from './auth.types';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.authState$ = this.angularFireAuth.authState;
    this.logout();
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    } else {
      operation = isSignIn ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }

    return operation;
  }

  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
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
