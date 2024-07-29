import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { ChatModule } from './api/chat/chat.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { RabbitMQModule } from './api/rabbitmq/rabbitmq.module';
// import { ConfigModule } from '@nestjs/config';
// import { ChatModule } from './api/chat/chat.module';
// import { RabbitMQModule } from './api/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '.env',
    // }),
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
    AuthModule,
    UsersModule,
    ChatModule,
    MongooseModule.forRoot(
      //Replace this line with the one Cluster > Connect > Connect your Application
      // `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.suflu.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
      `mongodb+srv://yazidihsan1:z1uDv4bPAx0GUofV@cluster0.uvbx7ro.mongodb.net/`,
      // 'mongodb+srv://yazidihsan1:CcXSYl1EaaSlmXkI@cluster0.uvbx7ro.mongodb.net/test?retryWrites=true&w=majority',
      // 'mongodb://atlas-sql-669c4f23753eb667d5d0b3cf-nx4kg.a.query.mongodb.net/test?ssl=true&authSource=admin',
      // 'mongodb+srv://yazidihsan1:DV1oIoC8Ho8nYUaI@cluster0.uvbx7ro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    // RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
