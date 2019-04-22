import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: any[];
  text: string;
  
  @ViewChild('inputText') searchElement: ElementRef;

  constructor(private service: AppService) {
    this.service.connectMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnInit() {
    this.service.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  //Focus on new message box when enter chat
  ngAfterViewInit(): void {   
    this.searchElement.nativeElement.focus();    
  }

  sendMessage() {
    this.service.sendMessage(this.text).subscribe(newMessage => {
      this.text = "";
    })
  }

}
