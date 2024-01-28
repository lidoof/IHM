import { Injectable } from '@angular/core';
import { createEffect, dispatch, ofType } from '@ngneat/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SessionActions from './reservation.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ReservationRepo } from './reservation.store';
import { AuthService } from '../../services/auth.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from './reservationModel';


@Injectable({ providedIn: 'root' })
export class ReservationEffects {
  reservation$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.ReservationSubmit),
        switchMap((action) => {
       console.log('rootm type from action ', action.reservation);   
          this.reservationRepo.updateLoadingreservation(true);
          return this.reservationService.reservation(action.reservation).pipe(
            map((room:any) => {
              return SessionActions.ReservationSuccess({reservation:room});
            }),
            catchError((error: string) => {
              return of(SessionActions.ReservationError({message:error}));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  reservationSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationSuccess),
      tap(async (action) => {
        this.reservationRepo.updateLoadingreservation(false);
        this.reservationRepo.setEntities(action.reservation);
      }),
    );
  });

  reservationError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationError),
      tap(async (action) => {
        console.log("actionm: ",action.message);
        this.reservationRepo.updateLoadingreservation(false);
      }),
    );
  });


  



  

  constructor(
    private reservationRepo: ReservationRepo,
    private router: Router,
    private reservationService: ReservationService
  ) {}
}
