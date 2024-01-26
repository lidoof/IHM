import { createAction, props } from '@ngneat/effects';
import {Wallet} from './wallet.model';

export const walletSubmit = createAction('[Session] wallet submit');

export const walletSubmitSuccess = createAction('[Session] wallet  success', props<{ wallet: Wallet}>());

export const walletSubmitError = createAction('[Session] wallet submit error', props<{ error: string }>());
