import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import { AuthService } from './auth/auth.service';
import * as schema from './schema/equipment.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userSubscription: Subscription;
  public user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) { }

  public ngOnInit() {
    // init this.user on startup
    this.authService.me().subscribe(data => {
      this.user = data.user;
      this.navigate('');
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

  //Listener for events that fire when a window is about to unload its resources
  //Logout user when that happens
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.logout();
  }

  logout(): void {
    this.authService.signOut(this.user).subscribe(res => {
      this.navigate('/auth/login');
    })
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
