import { NavController } from '@ionic/angular';
import { TasksService } from './../../services/tasks.service';
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

  constructor(private tasksService: TasksService, private navController: NavController) {}

  ngOnInit() {
    this.tasks$ = this.tasksService.getAll();
  }

  onUpdate(task: Task): void {
    this.navController.navigateForward(['tasks', 'edit', task.id]);
  }
}
