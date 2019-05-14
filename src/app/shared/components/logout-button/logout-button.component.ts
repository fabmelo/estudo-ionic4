import { async } from '@angular/core/testing';
import { OverlayService } from './../../../core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { OnInit, Component } from '@angular/core';

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
  constructor(
    private authService: AuthService,
    private navController: NavController,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {}

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            this.navController.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }
}
