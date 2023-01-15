import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, tap, throwError } from 'rxjs';
import { CreateOrderDto, GetOrderDto } from './entities/dtos';
import { Order, OrderDocument } from '@my-workspace/schemas';

@Injectable()
export class AppService {
  private logger = new Logger('OrderService');
  constructor(
    @InjectModel(Order.name) private readonly catModel: Model<OrderDocument>
  ) {}
  createOrder(payload: CreateOrderDto) {
    return from(this.catModel.create(payload)).pipe(
      tap((order) => console.log('In here', order)),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => new RpcException('Error creating order'));
      })
    );
  }

  getOrder(payload: GetOrderDto) {
    return from(this.catModel.findById(payload.id)).pipe(
      tap((order) => console.log('In here', order)),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => new RpcException('Error Fetching order'));
      })
    );
  }
}
