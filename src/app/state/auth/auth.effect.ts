import { Injectable } from '@angular/core';
import { createEffect, dispatch, ofType } from '@ngneat/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SessionActions from './auth.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SessionRepository } from './auth.store';
import { AuthService } from '../../services/auth.service';
import { profilSubmit } from '../profil/profil.action';

@Injectable({ providedIn: 'root' })
export class SessionEffects {
  loginSession$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.loginSubmit),
        switchMap((action) => {
          this.sessionRepo.updateLoadingSession(true);
          return this.authService.login(action.credential).pipe(
            map((session: any) => {
              return SessionActions.loginSubmitSuccess({ session });
            }),
            catchError((error:any) => {
              console.log("error submit: ",error.error.error);
              return of(SessionActions.loginSubmitError({ error:error.error.error }));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  loginSessionSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.loginSubmitSuccess),
      tap(async (action) => {
        this.router.navigate(['/home'])
        this.sessionRepo.updateLoadingSession(false);
      }),
    );
  });

  loginSubmitError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.loginSubmitError),
      tap(async (action) => {
        this.sessionRepo.updateLoadingSession(false);
      }),
    );
  });



  signupSession$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.signupSubmit),
        switchMap((action) => {
          this.sessionRepo.updateLoadingSession(true);
          return this.authService.signup(action.credential).pipe(
            map((session: any) => {
              return SessionActions.signupSubmitSuccess({ session });
            }),
            catchError((error: string) => {
              return of(SessionActions.signupSubmitError({ error }));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  signupSessionSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.signupSubmitSuccess),
      tap(async (action) => {
        console.log('action: success: ',action.session)
        dispatch(profilSubmit({id:action.session.customerId}))
        this.sessionRepo.updateLoadingSession(false);
        this.sessionRepo.setEntities(action.session);
      }),
    );
  });

  signupSubmitError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.signupSubmitError),
      tap(async (action) => {
        this.sessionRepo.updateLoadingSession(false);
      }),
    );
  });

  

  constructor(
    private sessionRepo: SessionRepository,
    private authService: AuthService,
    private router: Router,
  ) {}
}
