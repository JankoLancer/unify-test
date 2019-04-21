import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: any[];
  text: string;

  constructor(private service: AppService) { 
    this.service.connectMessage().subscribe(message =>{
      this.messages.push(message);
    })
  }

  ngOnInit() {
    this.service.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(){
    this.service.sendMessage(this.text).subscribe(newMessage => {
      //this.messages.push(newMessage);
    })
  }

}
