import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any[];

  constructor(private service: AppService) {
    this.service.connectUserActivated().subscribe(user => {
      this.users.push(user);
    });

    this.service.connectUserDectivated().subscribe(user => {
      let index = this.users.findIndex(x => x._id == user._id);
      this.users.splice(index, 1);
    });
  }

  ngOnInit() {
    this.service.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
