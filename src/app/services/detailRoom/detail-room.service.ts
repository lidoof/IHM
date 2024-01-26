import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailRoomService {

  constructor(private httpClient :HttpClient) {

   }
   getAllRoom():Observable<any>{
    const url = "dsqdqsdqsdqs"
    return this.httpClient.get(url).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )}
}


