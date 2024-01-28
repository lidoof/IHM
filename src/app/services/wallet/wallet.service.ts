import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environnemen';
import { URL } from '../../url-api';
import { WalletRepo } from '../../state/wallet/wallet.store';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  walletId$:Observable<any> = this.walletStore.getFirstEntity();
  getWalletInfo(wallett:string):Observable<any>{
    let url =""
    this.walletId$.subscribe((wallet:any ) =>{
       url=`${environment.apiUrl + URL.GET_WALLET}/${wallet.id}`
    })
    return this.httpClient.get(url).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )
  }
  addFound(montant:number,currency:string,walledId:string):Observable<any>{

    const url =`${environment.apiUrl +URL.GET_WALLET}/${walledId}/add-funds`
    return this.httpClient.post(url,{
      Amount:montant,
      PreferredCurrency:currency
    }).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )
  }

  constructor(private httpClient: HttpClient,
              private walletStore: WalletRepo) { }
}
