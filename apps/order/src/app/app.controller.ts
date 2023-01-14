import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { OrderConfig, orderConfig } from './config';
import { CreateOrderDto, GetOrderDto } from './entities/dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_order')
  createOrder(payload: CreateOrderDto) {
    return this.appService.createOrder(payload);
  }

  @EventPattern('get_order')
  getOrder(payload: GetOrderDto) {
    return this.appService.getOrder(payload);
  }
}
