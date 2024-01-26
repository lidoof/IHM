import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CredentialUser, SingupModel } from '../state/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  
signup(user: SingupModel):Observable<any>{
  return this.httpClient.post('dsdsq',user).pipe(
    catchError((error)=>{
      throw new Error(error);
    })
  );
}

login(user:CredentialUser):Observable<any>{
  return this.httpClient.post('erlmzkrmlez',user).pipe(
    catchError((error)=>{
      throw new Error(error);
    })
  )}
}
