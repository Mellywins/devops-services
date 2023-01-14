import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, tap } from 'rxjs';
import { CreateOrderDto, GetOrderDto } from './entities/dtos';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Order.name) private readonly catModel: Model<OrderDocument>
  ) {}
  createOrder(payload: CreateOrderDto) {
    return from(this.catModel.create(payload)).pipe(
      tap((order) => console.log(order))
    );
  }

  getOrder(payload: GetOrderDto) {
    console.log(payload);
    return '';
  }
}
