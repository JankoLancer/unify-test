import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { TokenStorage } from './auth/token.storage';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class AppService {

  constructor(private http: HttpClient, private token: TokenStorage, private socket: Socket) {
    //  socket.on("add message", )
  }

  connectMessage(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

  connectUserActivated(): Observable<any>{
    return Observable.create((observer) => {
      this.socket.on('user-activated', (user) => {
        observer.next(user);
      });
    });
  }

  connectUserDectivated(): Observable<any>{
    return Observable.create((observer) => {
      this.socket.on('user-deactivated', (user) => {
        observer.next(user);
      });
    });
  }

  getUser(): any {
    return (<any>window).user;
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
