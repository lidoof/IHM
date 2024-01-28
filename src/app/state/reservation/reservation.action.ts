import { createAction, props } from '@ngneat/effects';
import { Reservation } from './reservationModel';


export const ReservationSubmit = createAction('[reservation ] reservation submit',
props<{reservation:Partial<Reservation>}>())
    
export const ReservationSuccess = createAction('[reservation ] reservation sucess',
props<{reservation:Reservation}>())
export const ReservationError = createAction('[reservation ] reservation error',
props<{message:string}>())