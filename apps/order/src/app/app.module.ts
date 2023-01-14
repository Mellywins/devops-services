import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { orderConfig } from './config';

@Module({
  imports: [ConfigModule.forFeature(orderConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
