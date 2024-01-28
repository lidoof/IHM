import { createAction, props } from '@ngneat/effects';
import {Wallet} from './wallet.model';
 
export enum Currency {
    Euro,
    Dollar,
    PoundSterling,
    Yen,
    SwissFranc
}

export const walletSubmit = createAction('[Session] wallet submit',props<{walledId:string}>());

export const walletSubmitSuccess = createAction('[Session] wallet  success', props<{ wallet: Wallet}>());

export const walletSubmitError = createAction('[Session] wallet submit error', props<{ error: string }>());

export const addFoundSubmit = createAction('[Session] addsubmit',props<{montant:number,currency:Currency,walletId:string}>());

export const addFoundSuccess = createAction('[Session] add success', props<{ montant:number}>());

export const addFoundError = createAction('[Session] add submit error', props<{ error: string }>());

