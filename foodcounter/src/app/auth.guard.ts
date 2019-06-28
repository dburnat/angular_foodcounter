
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

 @Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;

   constructor(private authService: AuthService, router: Router) {}
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authState.pipe(
      map((user: User) => {
        console.log(user);
        return true;
      })
    );
  }
}
