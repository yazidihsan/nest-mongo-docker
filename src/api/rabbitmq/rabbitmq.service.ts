// src/rabbitmq/rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
// import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
// import { error } from 'console';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'chat_queue',
        queueOptions: {
          durable: false,
          noAck: false,
        },
      },
    });
  }

  sendMessage(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }
  // async onModuleInit() {
  //   await this.client.connect().catch((error) => console.log(error));
  // }
}
