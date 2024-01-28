import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environnemen';
import { URL } from '../../url-api';
import { Reservation } from '../../state/reservation/reservationModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient :HttpClient) {

   }
   reservation(reservation:Partial<Reservation>){
    const url = `${environment.apiUrl +URL.RESERVATION}`
    return this.httpClient.post(url,reservation).pipe(
        catchError((error) => throwError(() => error.error?.message))
    )}
}


