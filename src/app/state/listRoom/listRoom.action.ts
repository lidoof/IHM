import { createAction, props } from '@ngneat/effects';
import {listRoom} from './listRoom.model';

export const listRoomSubmit = createAction('[Session] listRoom submit');

export const listRoomSubmitSuccess = createAction('[Session] listRoom  success', props<{ session: listRoom}>());

export const listRoomSubmitError = createAction('[Session] listRoom submit error', props<{ error: string }>());
