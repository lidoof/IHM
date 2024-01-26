import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListRoomService {

  constructor(
    private httpClient: HttpClient
  ) { }


    getAllRoom():Observable<any>{
      return this.httpClient.get('erlmzkrmlez').pipe(
        catchError((error)=>{
          throw new Error(error);
        })
      )}
}
