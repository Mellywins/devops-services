import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { orderConfig } from './config';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    ConfigModule.forFeature(orderConfig),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(orderConfig)],
      inject: [orderConfig.KEY],
      useFactory: async (configService: ConfigType<typeof orderConfig>) => ({
        uri: configService.MONGO_URL,
      }),
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
