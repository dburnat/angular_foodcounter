
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {


   constructor(
     public authService: AuthService,
     public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
      if(!(this.authService.isLoggedIn)){
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

}
