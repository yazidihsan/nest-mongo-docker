// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message-schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Messages') private readonly messageModel: Model<Message>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    const message = await createdMessage.save();
    this.rabbitMQService.sendMessage('chat', message);
    return message;
  }

  async findAll() {
    const messages = await this.messageModel.find().exec();

    return messages;
  }
}

// import { Injectable, Inject } from '@nestjs/common';

// @Injectable()
// export class ChatService {
//   constructor(
//     @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
//   ) {}

//   async getMessages() {
//     return new Promise((resolve, reject) => {
//       this.client.send({ cmd: 'get-messages' }, {}).subscribe({
//         next: (message) => {
//           console.log('Raw message received:', message);

//           if (message) {
//             console.log('Processed message:', message);
//             resolve(message);
//           } else {
//             console.error('Received undefined message');
//             reject(new Error('Received undefined message'));
//           }
//         },
//         error: (err) => {
//           console.error('Error receiving message:', err);
//           reject(err);
//         },
//       });
//     });
//   }
// }

// // src/rabbitmq/rabbitmq.service.ts
// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { UsersService } from '../users/users.service';
// import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

// @Injectable()
// export class ChatService implements OnModuleInit {
//   private client: ClientProxy;

//   constructor(
//     @Inject('RABBITMQ_SERVICE') private readonly rabbitMqClient: ClientProxy,
//     private readonly userService: UsersService,
//   ) {}
//   onModuleInit() {
//     this.client = this.rabbitMqClient;
//   }

//   async sendMessage(message: string, userId: string) {
//     const user = await this.userService.getUserById(userId);
//     try {
//       // await this.client.connect();
//       if (user) {
//         const res = this.client.emit(message, userId);
//         // await res.subscribe();
//         const result = {
//           status: 'success',
//           message: 'message sent to RabbitMQ',
//           res,
//         };
//         return {
//           ...result,
//         };
//       } else {
//         throw new Error('User not found');
//       }
//     } catch (error) {
//       throw new ExceptionsHandler(error);
//     }
//   }

//   async receiveMessages() {
//     try {
//       return new Promise(() => {
//         this.client.emit({ cmd: 'get-messages' }, {}).subscribe({
//           next: (message) => {
//             console.log('Raw message received:', message);

//             if (message) {
//               console.log('Processed message:', message);
//               return message;
//               // resolve(message);
//             } else {
//               console.error('Received undefined message');
//               // reject(new Error('Received undefined message'));
//               return 'Received undefined message';
//             }
//           },
//           error: (err) => {
//             console.error('Error receiving message:', err);
//             return err;
//             // reject(err);
//           },
//         });
//       });

//       // return await this.client.emit({ cmd: 'get-messages' }, {});
//     } catch (error) {
//       throw new ExceptionsHandler(error);
//     }
//   }
// }
