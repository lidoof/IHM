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
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DateRangePickerComponent } from '../../pages/reservation/confirmation/confirmation';
import { ToastComponent } from '../../pages/component/toast/toast.component';


@Injectable({ providedIn: 'root' })
export class ReservationEffects {
  reservation$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.ReservationSubmit),
        switchMap((action) => {
       
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
        console.log("succes reservation");
         this.dialog.open(DateRangePickerComponent, {
          width: '250px',
          disableClose: true, // Cela empêche la fermeture du dialog en cliquant sur le backdrop
          // ... autres options si nécessaire
        }),
        {dispatch:false}


      }),
    );
  });

  reservationError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationError),
      tap(async (action) => {
        console.log("erreur reservation");
        console.log("actiondsdsdsm error reservation: ",action.message);
        this.reservationRepo.updateLoadingreservation(false);
      }),
    );
  });






  reservationConfirm$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.ReservationConfirmSubmit),
        switchMap((action) => {
       console.log('rootm type from action ');   
          this.reservationRepo.updateLoadingreservation(true);
          return this.reservationService.reservationconfirm(action.ReservationConfirm)
          .pipe(
            map((room:any) => {
              return SessionActions.ReservationConfirmSuccess({ReservationConfirm:room});
            }),
            catchError((error: string) => {
              return of(SessionActions.ReservationConfirmError({message:error}));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  reservationConfirmSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationConfirmSuccess),
      tap(async (action) => {
        console.log("confirl reservation");
        this.reservationRepo.updateLoadingreservation(false);
        console.log("reservation success");
        const dialogRef = this.dialog.open(ToastComponent, {
          data: 'reservation confirmé avec succes' ,
          
        });
        setTimeout(()=>{
          dialogRef.close()
        },2000)
      }),
    );

  });

  reservationConfirmError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationConfirmError),
      tap(async (action) => {
        console.log("erreur de confirmation: ",action);
        const dialogRef=this.dialog.open(ToastComponent,{
          data:'erreur lors de la confirmation'
        }
          )
          setTimeout(()=>{
            dialogRef.close()
          },2000)
        this.reservationRepo.updateLoadingreservation(false);
      }),
    );
  });



  reservationCancel$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.ReservationCancelmSubmit),
        switchMap((action) => {
       console.log('rootm type from action ');   
          this.reservationRepo.updateLoadingreservation(true);
          return this.reservationService.reservationcancel(action.ReservationConfirm)
          .pipe(
            map((room:any) => {
              return SessionActions.ReservationCancelSuccess({ReservationConfirm:room});
            }),
            catchError((error: string) => {
              return of(SessionActions.ReservationCancelError({message:error}));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  reservationCancelSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationCancelSuccess),
      tap(async (action) => {
        this.reservationRepo.updateLoadingreservation(false);
        const dialogRef = this.dialog.open(ToastComponent, {
          data: 'reservation annulé avec succes' ,
          
        });

        setTimeout(()=>{
          dialogRef.close()
        },2000)
      }),
    );
  });

  reservationCancelError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.ReservationCancelError),
      tap(async (action) => {
        console.log("actioncancel: ",action.message);
        this.reservationRepo.updateLoadingreservation(false);
        const dialogRef = this.dialog.open(ToastComponent, {
          data: 'erreur lors de tentative de cancel' ,
          
        });
        setTimeout(()=>{
          dialogRef.close()
        },2000)
      }),
    );
  });


  



  

  constructor(
    private reservationRepo: ReservationRepo,
    private router: Router,
    private reservationService: ReservationService,
    public dialog: MatDialog
  ) {}
}
