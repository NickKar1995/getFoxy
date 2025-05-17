import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly matDialogRef = inject(DialogRef);
  isLoginMode = true;
  loginForm!: FormGroup;

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    if (this.isLoginMode) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          const messageObject = this.notificationService.createSuccessNotificationObj(
            'Success',
            'Welcome',
          );
          this.notificationService.success(messageObject);
        },
        error: (error) => {
          console.error(error);
          const messageObject = this.notificationService.createSuccessNotificationObj(
            'Failed to log',
            'Try again',
          );
          this.notificationService.error(messageObject);
        },
        complete: () => {
          this.matDialogRef.close();
        },
      });
    } else {
      this.authService.register(this.loginForm.value).subscribe({
        next: (valuesFromBack) => {
          console.log(valuesFromBack, 'Goal');
          // TODO Change the notification for proper login
          const messageObject = this.notificationService.createSuccessNotificationObj(
            'Success',
            'User registered!',
          );
          this.notificationService.success(messageObject);
        },
        error: (error) => {
          console.error(error);
          const messageObject = this.notificationService.createSuccessNotificationObj(
            'Failed to register',
            'Try again',
          );
          this.notificationService.error(messageObject);
        },
        complete: () => {
          this.matDialogRef.close();
        },
      });
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [null, [Validators.required, Validators.min(0.01)]],
    });
  }
}
