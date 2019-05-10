import { OverlayService } from './../../../core/services/overlay.service';
import { AuthProvider } from './../../../core/services/auth.types';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  changeAuthAction() {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have as account';
    !isSignIn ? this.form.addControl('name', this.nameControl) : this.form.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.form.value,
        provider
      });
      console.log('Authenticated: ', credentials);
      console.log('Redirecting ...');
    } catch (e) {
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
