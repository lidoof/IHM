import { createAction, props } from '@ngneat/effects';
import {listRoom} from './listRoom.model';


export const listRoomSubmit = createAction('[Session] listRoom submit',props<{roomType:string}>());

export const listRoomSubmitSuccess = createAction('[Session] listRoom  success', props<{ room: listRoom}>());

export const listRoomSubmitError = createAction('[Session] listRoom  error', props<{ error: string }>());
