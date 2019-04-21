import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { TokenStorage } from './auth/token.storage';

@Injectable()
export class AppService {

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
      })
    });
  }

  register(fullname: string, email: string, password: string, repeatPassword: string): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/auth/register', {
        fullname,
        email,
        password,
        repeatPassword
      }).subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        this.token.saveToken(data.token);
        observer.complete();
      })
    });
  }

  setUser(user): void {
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): any {
    return (<any>window).user;
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

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    delete (<any>window).user;
  }

  getUsers(): Observable<any[]> {
    return Observable.create(observer => {
      this.http.get('/api/user').subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  getMessages(): Observable<any[]> {
    return Observable.create(observer => {
      this.http.get('/api/message').subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

  sendMessage(text): Observable<any> {
    return Observable.create(observer => {
      this.http.post('/api/message', {
        text: text,
        author: this.getUser()._id
      }).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      })
    });
  }

}
