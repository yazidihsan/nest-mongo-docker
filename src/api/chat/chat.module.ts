import { Module } from '@nestjs/common';
// import { UsersModule } from '../users/users.module';
// import { ChatController } from './chat.controller';
// import { ChatService } from './chat.service';
// import { Mongoose } from 'mongoose';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from 'src/model/user.model';
// import { Message, MessageSchema } from './schemas/message-schema';
// import { UsersModule } from '../users/users.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
// import { MessageProducerService } from './message.producer';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/message-schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { Message } from './schemas/message-schema';
// import { Message } from './schemas/message-schema';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'chat_queue',
          queueOptions: {
            durable: false,
            noAck: false,
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: 'Messages', schema: MessageSchema }]),
    // UsersModule,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, RabbitMQService],
  exports: [ChatGateway, ChatService, RabbitMQService],
})
export class ChatModule {}

// // src/chat/chat.module.ts
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ChatGateway } from './chat.gateway';
// import { ChatService } from './chat.service';
// import { Message, MessageSchema } from './schemas/message-schema';
// // import { ChatListener } from './chat.listener';
// import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
// import { ChatController } from './chat.controller';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
//   ],
//   providers: [ChatGateway, ChatService, RabbitMQService],
//   controllers: [ChatController],
// })
// export class ChatModule {}
