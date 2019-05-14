import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from '../../core/classes/firestore.class';
import { Task } from '../models/tasks.model';
import { AuthService } from '../../core/services/auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/tasks`, (ref: firestore.CollectionReference) => {
          return ref.orderBy('done', 'asc').orderBy('title', 'asc');
        });
        return;
      }
      this.setCollection(null);
    });
  }
}
