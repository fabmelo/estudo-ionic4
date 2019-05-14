import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule],
  declarations: [MenuToggleComponent],
  exports: [CommonModule, ReactiveFormsModule, IonicModule, MenuToggleComponent]
})
export class SharedModule {}
