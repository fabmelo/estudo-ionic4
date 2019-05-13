import { NavController } from '@ionic/angular';
import { OverlayService } from './../../../core/services/overlay.service';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss']
})
export class TaskSavePage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private overlayService: OverlayService,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    this.createForm();
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
      const task = await this.tasksService.create(this.form.value);
      await this.overlayService.toast({
        message: `Task ${this.form.get('title').value} created!`
      });
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
