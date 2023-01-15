import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { retry, tap } from 'rxjs';
import { MESSAGING_SERVICE_TOKEN } from './constants';
import { CreateOrderDto, GetOrderDto } from './dtos/orders.dto';

@Injectable()
export class AppService {
  private logger = new Logger('OrderService');
  constructor(
    @Inject(MESSAGING_SERVICE_TOKEN) private readonly orderService: ClientProxy
  ) {}
  getData(payload: GetOrderDto) {
    return this.orderService.send('get_order', payload).pipe(
      tap((order) =>
        this.logger.verbose('Order created: ' + JSON.stringify(order))
      ),
      retry(3)
    );
  }
  createOrder(payload: CreateOrderDto) {
    return this.orderService.send('create_order', payload).pipe(
      tap((order) =>
        this.logger.verbose('Order created: ' + JSON.stringify(order))
      ),
      retry(3)
    );
  }
}
