import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any[];
  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
