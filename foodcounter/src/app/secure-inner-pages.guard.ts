import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    public authService: AuthService,
    public router: Router) {}

  CanActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
      if(this.authService.isLoggedIn){
        window.alert("Nie masz dostępu do tej strony!");
        this.router.navigate(['home']);
      }
      return true;
    }


}
