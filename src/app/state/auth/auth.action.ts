import { createAction, props } from '@ngneat/effects';
import { CredentialUser, Session, SingupModel } from './auth.model';

export const loginSubmit = createAction('[Session] Login submit', props<{ credential: CredentialUser }>());

export const loginSubmitSuccess = createAction('[Session] Login  success', props<{ session: Session }>());

export const loginSubmitError = createAction('[Session] Login submit error', props<{ error: string }>());

export const signupSubmit = createAction('[Session] Login submit', props<{ credential: SingupModel }>());

export const signupSubmitSuccess = createAction('[Session] Login  success', props<{ session: Session }>());

export const signupSubmitError = createAction('[Session] Login submit error', props<{ error: string }>());

