import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environnemen';
import { URL } from '../../url-api';

@Injectable({
  providedIn: 'root'
})
export class ListRoomService {

  constructor(
    private httpClient: HttpClient
  ) { }


    getAllRoom(roomType:string):Observable<any>{
     
      const params = new URLSearchParams();
      params.append('roomType', String(roomType));
      const url = environment.apiUrl +URL.SEARCH_ROOM +'?'+params.toString();
      return this.httpClient.get(url).pipe(
        catchError((error)=>{
          throw new Error(error);
        })
      )}
}
