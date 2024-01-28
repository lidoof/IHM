import { Injectable } from '@angular/core';
import { createEffect, dispatch, ofType } from '@ngneat/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as SessionActions from './listRoom.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { listRoomRepo } from './listRoom.store';
import { AuthService } from '../../services/auth.service';
import { ListRoomService } from '../../services/listRoom/list-room.service';


@Injectable({ providedIn: 'root' })
export class ListRoomEffects {
  listroom$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(SessionActions.listRoomSubmit),
        switchMap((action) => {
       console.log('dispatcijg',);   
          this.listRoomRepo.updateLoadinglistRoom(true);
          return this.listRoomService.getAllRoom(action.roomType).pipe(
            map((room: any) => {
              return SessionActions.listRoomSubmitSuccess({ room });
            }),
            catchError((error: string) => {
              return of(SessionActions.listRoomSubmitError({ error }));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  listroomSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.listRoomSubmitSuccess),
      tap(async (action) => {
        this.listRoomRepo.updateLoadinglistRoom(false);
        this.listRoomRepo.setEntities(action.room);
      }),
    );
  });

  listRoomError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(SessionActions.listRoomSubmitError),
      tap(async (action) => {
        console.log("action list room ",action.error);
        this.listRoomRepo.updateLoadinglistRoom(false);
      }),
    );
  });



  

  constructor(
    private listRoomRepo: listRoomRepo,
    private router: Router,
    private listRoomService: ListRoomService
  ) {}
}
