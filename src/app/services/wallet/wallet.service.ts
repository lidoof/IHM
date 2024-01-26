import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  getWalletInfo():Observable<any>{
    const url="kfdlmskfmk"
    return this.httpClient.get(url).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )
  }

  constructor(private httpClient: HttpClient) { }
}
