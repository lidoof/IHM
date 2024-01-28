import { Injectable } from '@angular/core';
import { createEffect, dispatch, ofType } from '@ngneat/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as profilActions from './profil.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ProfilRepo } from './profil.store';
import { AuthService } from '../../services/auth.service';
import { Profil } from './profil.model';




@Injectable({ providedIn: 'root' })
export class ProfilEffects {
  profil$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(profilActions.profilSubmit),
        switchMap((action) => {
          this.profilRepo.updateLoadingProfil(true);
          //TODO A FAIIIIRE profil ID
          return this.profilService.getprofilInfo(action.id).pipe(
            map((profil: Profil) => {
              return profilActions.profilSubmitSuccess({ profil});
            }),
            catchError((error: string) => {
              return of(profilActions.profilSubmitError({ error }));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  profilSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(profilActions.profilSubmitSuccess),
      tap(async (action) => {
        this.profilRepo.updateLoadingProfil(false);
        this.profilRepo.setEntities(action.profil);
      }),
    );
  });

  profilError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(profilActions.profilSubmitError),
      tap(async (action) => {
        this.profilRepo.updateLoadingProfil(false);
      }),
    );
  });



  

  constructor(
    private profilRepo: ProfilRepo,
    private router: Router,
    private profilService: AuthService
  ) {}
}
