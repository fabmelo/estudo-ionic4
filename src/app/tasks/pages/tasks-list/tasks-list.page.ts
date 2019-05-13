import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss']
})
export class TasksListPage implements OnInit {
  tasks$: Observable<Task[]>;

  constructor() {}

  ngOnInit() {
    this.tasks$ = of([
      { id: '45df45sd4f5s4df', title: 'Aprender Ionic 1', done: false },
      { id: '45ds4f5sd4f54df', title: 'Aprender Ionic 2', done: false },
      { id: '5h5fg4h54fg5h44', title: 'Aprender Ionic 3', done: false },
      { id: '5rwe4r54we5r4we', title: 'Aprender Ionic 4', done: false },
      { id: '45k4lj5k4ljk4l5', title: 'Aprender Ionic 5', done: false }
    ]);
  }
}
