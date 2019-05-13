import { Input, Output, EventEmitter, Component } from '@angular/core';
import { Task } from './../../models/tasks.model';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.scss']
})
export class TasksItemComponent {
  @Input() task: Task;
  @Output() done = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
}
