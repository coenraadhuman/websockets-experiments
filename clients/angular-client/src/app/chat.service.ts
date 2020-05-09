import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { 

  }

  public sendChat(message){
    this.socket.emit('message', message);
  }

  public receiveChat(){
    return this.socket.fromEvent('broadcast');
  }

}
