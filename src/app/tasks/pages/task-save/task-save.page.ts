import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OverlayService } from './../../../core/services/overlay.service';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss']
})
export class TaskSavePage implements OnInit {
  form: FormGroup;
  pageTitle = '...';
  taskId: string = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private navController: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.init();
  }

  init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.pageTitle = 'Create Task';
      return;
    }
    this.pageTitle = 'Edit Task';
    this.taskId = taskId;
    this.tasksService
      .getById(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.form.get('title').setValue(title);
        this.form.get('done').setValue(done);
      });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      if (!this.taskId) {
        await this.tasksService.create(this.form.value);
        await this.overlayService.toast({
          message: `Task ${this.form.get('title').value} created!`
        });
      } else {
        await this.tasksService.update({
          id: this.taskId,
          ...this.form.value
        });
        await this.overlayService.toast({
          message: `Task ${this.form.get('title').value} updated!`
        });
      }

      setTimeout(() => {
        this.navController.navigateBack('/tasks');
      }, 500);
    } catch (e) {
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
