import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthService,
    TokenStorage
  ]
})
export class AuthModule { }
