import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CredentialUser, SingupModel } from '../state/auth/auth.model';
import { environment } from '../../environnemen';
import { URL } from '../url-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getprofilInfo(id: string):Observable<any> {
    const url = environment.apiUrl + URL.CONNEXION
    return this.httpClient.get(url).pipe(
      catchError((error)=>{
        throw new Error(error);
      })
    )
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  
signup(user: SingupModel):Observable<any>{
  const url = environment.apiUrl + URL.INSCIRPTION
  return this.httpClient.post(url,user).pipe(
    catchError((error)=>{
      throw new Error(error);
    })
  );
}

login(user:CredentialUser):Observable<any>{
  const url = environment.apiUrl + URL.CONNEXION
  return this.httpClient.post(url,user).pipe(
    catchError((error)=>{
      throw new Error(error);
    })
  )}
}
