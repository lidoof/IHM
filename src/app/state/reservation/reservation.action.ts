import { createAction, props } from '@ngneat/effects';
import { Reservation } from './reservationModel';
import { ReservationRequest } from '../../pages/reservation/reservation.component';

export const ReservationSubmit = createAction('[reservation ] reservation submit',
props<{reservation:ReservationRequest}>())
    
export const ReservationSuccess = createAction('[reservation ] reservation sucess',
props<{reservation:Reservation}>())
export const ReservationError = createAction('[reservation ] reservation error',
props<{message:string}>())

export const ReservationConfirmSubmit = createAction('[ReservationConfirm ] ReservationConfirm submit',
props<{ReservationConfirm:string}>())
    
export const ReservationConfirmSuccess = createAction('[ReservationConfirm ] ReservationConfirm sucess',
props<{ReservationConfirm:any}>())
export const ReservationConfirmError = createAction('[ReservationConfirm ] ReservationConfirm error',
props<{message:string}>())
export const ReservationCancelmSubmit = createAction('[ReservationCancel ] ReservationCancel submit',
props<{ReservationConfirm:string}>())
    
export const ReservationCancelSuccess = createAction('[ReservationCancel ] ReservationCancel sucess',
props<{ReservationConfirm:any}>())
export const ReservationCancelError = createAction('[ReservationCancel ] ReservationCancel error',
props<{message:string}>())
