import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);
  return authService.isAuthenticated().pipe(
    map((isAuth) => {
      if (isAuth) {
        return true;
      }
      const messageObject = notificationService.createSuccessNotificationObj(
        'Wrong path',
        'Login first',
      );
      notificationService.error(messageObject);
      return router.createUrlTree(['/']);
    }),
  );
};
