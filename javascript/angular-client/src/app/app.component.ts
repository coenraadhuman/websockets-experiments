import { Component } from '@angular/core';
import {ChatService} from './chat.service'
import { AppModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name: string = 'Anonymous';
  newMessage: string;
  messageList:  AppModel[] = [];
  clientsAmount;

  constructor(private chatService: ChatService) {
  }

  sendMessage() {  
    this.chatService.sendChat({
      name: this.name,
      message: this.newMessage,
      processed: null,
      sent: Date.now(),
      arrived: null
    });
    this.newMessage = '';
  }

  public getMilliseconds(val: number): string {
    return `${(new Date(val)).getHours()}:${(new Date(val)).getMinutes()}:${(new Date(val)).getSeconds()}.${(new Date(val)).getMilliseconds()}`;
  }

  ngOnInit() {
    this.chatService
      .receiveChat()
      .subscribe((message: AppModel) => {
        this.messageList.push({
          ...message,
          arrived: Date.now()
        });
      });
    this.chatService
    .getClients()
    .subscribe(clients => {
      this.clientsAmount = clients;
    });
  }
}
