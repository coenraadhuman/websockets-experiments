import { Component } from '@angular/core';
import {ChatService} from './chat.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newMessage: string;
  messageList:  string[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    console.log('Executed:' + this.newMessage);
    
    this.chatService.sendChat(this.newMessage);
    this.newMessage = '';
  }
  ngOnInit() {
    this.chatService
      .receiveChat()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }
}
