import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MessageProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], // replace with your RabbitMQ URL
        queue: 'chat_queue', // replace with your queue name
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  sendMessage(message: any) {
    return this.client.emit({ cmd: 'get-messages' }, message);
  }
}
