import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  name: string;
  error: string;

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.name)
      .subscribe(data => {
        if (data.err)
          this.error = data.err;
        else {
          this.error = "";
          this.router.navigate(['']);
        }
      })
  }

}
