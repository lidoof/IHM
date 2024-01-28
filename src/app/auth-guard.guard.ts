import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { selectEntity } from '@ngneat/elf-entities';
import { SessionRepository } from './state/auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionRepo: SessionRepository,
  ) {}
  canActivate() {
    let isCanActivate: boolean = false;

    this.sessionRepo
      ?.getTheStore()
      .pipe(selectEntity('session'))
      .subscribe((session: any) => {
        if (session?.token !== undefined) {
          isCanActivate = true;
        } else {
          isCanActivate = false;
        }
      });

    if (!isCanActivate) {
      console.log("eroizeprizepr");
      this.router.navigate(['/sign-in']).then();
    }
    return isCanActivate;
  }
}
