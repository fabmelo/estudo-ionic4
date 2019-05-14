import { OverlayService } from './../../../core/services/overlay.service';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class LogoutButtonComponent implements OnInit {
  @Input() menuId: string;

  constructor(
    private authService: AuthService,
    private navController: NavController,
    private overlayService: OverlayService,
    private menuController: MenuController
  ) {}

  async ngOnInit(): Promise<void> {
    if (!(await this.menuController.isEnabled(this.menuId))) {
      this.menuController.enable(true, this.menuId);
    }
  }

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuController.enable(false, this.menuId);
            this.navController.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }
}
