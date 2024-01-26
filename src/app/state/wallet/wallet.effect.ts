import { Injectable } from '@angular/core';
import { createEffect, dispatch, ofType } from '@ngneat/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as WalletActions from './wallet.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { WalletService } from '../../services/wallet/wallet.service';
import { WalletRepo } from './wallet.store';
import { Wallet } from './wallet.model';



@Injectable({ providedIn: 'root' })
export class WalletEffects {
  wallet$ = createEffect(
    (actions$) =>
      actions$.pipe(
        ofType(WalletActions.walletSubmit),
        switchMap((action) => {
          this.walletRepo.updateLoadingwallet(true);
          return this.walletService.getWalletInfo().pipe(
            map((wallet: Wallet) => {
              return WalletActions.walletSubmitSuccess({ wallet});
            }),
            catchError((error: string) => {
              return of(WalletActions.walletSubmitError({ error }));
            }),
          );
        }),
      ),
    { dispatch: true },
  );
  walletSuccess$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(WalletActions.walletSubmitSuccess),
      tap(async (action) => {
        this.walletRepo.updateLoadingwallet(false);
        this.walletRepo.setEntities(action.wallet);
      }),
    );
  });

  walletError$ = createEffect((actions$) => {
    return actions$.pipe(
      ofType(WalletActions.walletSubmitError),
      tap(async (action) => {
        this.walletRepo.updateLoadingwallet(false);
      }),
    );
  });



  

  constructor(
    private walletRepo: WalletRepo,
    private router: Router,
    private walletService: WalletService
  ) {}
}
