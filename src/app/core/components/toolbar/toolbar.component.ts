import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../services/dialog/dialog.service';
import { LoginModalComponent } from '../../../features/auth/login-modal/login-modal/login-modal.component';
import { CredentialsPaylod, LoginResponse } from '../../models/Auth';
import { AuthDirective } from '../../auth/directives/auth.directive';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [AuthDirective, MatToolbarModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private readonly dialogService = inject(DialogService);
  private readonly authService = inject(AuthService);

  initiateLogin(): void {
    this.dialogService.open<LoginModalComponent, CredentialsPaylod, LoginResponse>({
      component: LoginModalComponent,
      panelClass: 'login-modal',
    });
  }

  initiateLogout() {
    this.authService.logout();
  }
}
