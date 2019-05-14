import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: './pages/task-save/task-save.module#TaskSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/task-save/task-save.module#TaskSavePageModule'
      },
      {
        path: '',
        loadChildren: './pages/tasks-list/tasks-list.module#TasksListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
