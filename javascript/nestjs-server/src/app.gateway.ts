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
 import { AppModel } from './app.model';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // Using the anotation to get our web socket server.
  @WebSocketServer() server: Server;

  // Something to track amount of users.
  connectedClients: number;

  // Creating a logger using NestJS logger.
  private logger: Logger = new Logger('AppGateway');

  // Subscribe to the keyword 'message'.
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: AppModel): void {
    this.server.emit('broadcast', {
      ...payload,
      processed: Date.now()
    });
  }

  // OnGatewayInit interface.
  afterInit(server: Server) {
    this.connectedClients = 0;
    this.logger.log('Websockets Server Started');
   }
  
   // OnGatewayDisconnect interface.
   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.decreaseConnectedClients();
   }
  
   // OnGatewayConnection interface.
   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.increaseConnectedClients();
   }

   private increaseConnectedClients(): void {
    this.connectedClients++;
    this.broadcastConnectedClients();
   }

   private decreaseConnectedClients(): void {
    this.connectedClients--;
    this.broadcastConnectedClients();
   }

   private broadcastConnectedClients(): void {
    this.server.emit('clients', this.connectedClients);
   }
}
