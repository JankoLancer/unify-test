import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';

import { TokenStorage } from './token.storage';
import { TooltipComponent } from '@angular/material';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) { }

  public $userSource = new Subject<any>();

  login(name: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/login', {
        name
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      }, (err: any) =>{
        observer.next({err: err.error.error})
        console.log(err.error);
        observer.complete();
      })
    });
  }

  setUser(user): void {
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) return observer.complete();
      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        observer.complete();
      })
    });
  }

  signOut(user): Observable<any> {
    return Observable.create(observer => {
      this.http.request("delete", '/api/auth/logout', {
        body: user
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        observer.complete();
      })
    });


  }
}
