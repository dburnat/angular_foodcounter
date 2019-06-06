import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';

 @Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authService: AngularFireAuth) { }

   authState: Observable<User> = this.authService.authState;

   login(email: string, pass: string): Promise<any> {
    return this.authService.auth.signInWithEmailAndPassword(email, pass);
  }
  logout(): void {
    this.authService.auth.signOut();
  }
}
