import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'user-detail', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
