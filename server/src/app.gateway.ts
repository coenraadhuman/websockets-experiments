import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // Using the anotation to get our web socket server.
  @WebSocketServer() server: Server;

  // Creating a logger using NestJS logger.
  private logger: Logger = new Logger('AppGateway');

  // Subscribe to the keyword 'message'.
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('broadcast', payload);
  }

  // OnGatewayInit interface.
  afterInit(server: Server) {
    this.logger.log('Init');
   }
  
   // OnGatewayDisconnect interface.
   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
   }
  
   // OnGatewayConnection interface.
   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
   }
}
