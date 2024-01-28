import {
  HttpBackend,
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import {
  catchError,
  filter,
  first,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { environment } from '../environnemen';
import { Router } from '@angular/router';
import { SessionRepository } from './state/auth/auth.store';
import { URL } from './url-api';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private http: HttpClient;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor(
    private httpBackend: HttpBackend,
    private router: Router,
    private sessionRepo: SessionRepository,
  ) {
    this.http = new HttpClient(this.httpBackend);
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return this.sessionRepo.getFirstEntity().pipe(
      first(),
      mergeMap((token: any) => {
        const tokenApps = token?.customerId;
        if (tokenApps) {
          return next.handle(this.addTokenHeader(req, tokenApps));
        } else {
          return next.handle(req);
        }
      }),
      catchError((error) => {
        if (
          error.status === 401 &&
          `${environment.apiUrl + URL.CONNEXION}` !== req.url
        ) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
   return throwError(() => Error('vous devez vous conencter'));
  }

  private addTokenHeader(req: HttpRequest<unknown>, token: string) {
    return req.clone({
      body:{
        customerId:token
      }
    });
  }
}
