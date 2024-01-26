import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorServiceInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
