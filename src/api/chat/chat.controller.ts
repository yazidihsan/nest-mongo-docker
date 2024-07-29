// import { Controller, Get } from '@nestjs/common';
// import { MessageProducerService } from './message.producer';

// @Controller('api/test')
// export class TestController {
//   constructor(
//     private readonly messageProducerService: MessageProducerService,
//   ) {}

//   @P('send')
//   async sendTestMessage() {
//     return await this.messageProducerService.sendMessage({
//       text: 'Hello, RabbitMQ!',
//     });
//   }
// }

// src/chat/chat.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
// import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
// import { Observable } from 'rxjs';
// import { Message } from './schemas/message-schema';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('messages')
  // async getMessages(): Promise<Message[]> {
  //   return await this.chatService.findAll();
  // }
  @UseGuards(JwtAuthGuard)
  @Post('/sendMessage')
  async sendMessage(@Body() body: CreateMessageDto) {
    try {
      return await this.chatService.createMessage(body);
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/viewMessages')
  async getMessages() {
    try {
      return await this.chatService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
