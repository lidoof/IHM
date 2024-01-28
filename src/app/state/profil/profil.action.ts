import { createAction, props } from '@ngneat/effects';
import {Profil} from './profil.model';

export const profilSubmit = createAction('[Session] profil submit',props<{ id:string}>());

export const profilSubmitSuccess = createAction('[Session] profil  success', props<{ profil: Profil}>());

export const profilSubmitError = createAction('[Session] profil submit error', props<{ error: string }>());


