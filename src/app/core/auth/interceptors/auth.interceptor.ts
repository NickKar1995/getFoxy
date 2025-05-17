import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuthRequest = req.url.includes('/login') || req.url.includes('/register');
  if (isAuthRequest) {
    return next(req);
  }
  const token = localStorage.getItem('jwt_token');
  const clonedRequest = req.clone({
    headers: req.headers.set('authorization', `Bearer ${token}`),
  });
  return next(clonedRequest);
};
