import { SharedModule } from './../../shared/shared.module';
import { TasksItemComponent } from './tasks-item/tasks-item.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [TasksItemComponent],
  imports: [SharedModule],
  exports: [TasksItemComponent]
})
export class ComponentsModule {}
