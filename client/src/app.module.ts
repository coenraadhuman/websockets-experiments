import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { RedisIoAdapter } from './redis-io.adapter';

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway, RedisIoAdapter],
})
export class AppModule {}
