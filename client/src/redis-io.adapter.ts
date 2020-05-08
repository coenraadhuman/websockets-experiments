import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

const redisAdapter = redisIoAdapter({ host: 'castleinthesky.ddns.net', port: 3000 });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    console.log('Connecting to castleinthesky.ddns.net');
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}