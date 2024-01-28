import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environnemen';
import { URL } from '../../url-api';
import { WalletRepo } from '../../state/wallet/wallet.store';
import { Currency } from '../../state/wallet/wallet.action';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  walletId$:Observable<any> = this.walletStore.getFirstEntity();
  getWalletInfo(wallett:string):Observable<any>{
    console.log("wlllet : ",wallett)
    let url = `${environment.apiUrl + URL.GET_WALLET}${wallett}`
    return this.httpClient.get(url).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )
  }
  addFound(montant:number,currency:Currency,walledId:string):Observable<any>{

    const url =`${environment.apiUrl +URL.GET_WALLET}${walledId}/add-funds`
    return this.httpClient.post(url,{
      amount:montant,
      preferredCurrency:currency
    }).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )
  }

  constructor(private httpClient: HttpClient,
              private walletStore: WalletRepo) { }
}
