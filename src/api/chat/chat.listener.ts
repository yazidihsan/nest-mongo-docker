// // src/chat/chat.listener.ts
// import { Controller } from '@nestjs/common';
// import { EventPattern, Payload } from '@nestjs/microservices';
// import { ChatService } from './chat.service';
// import { Message } from './schemas/message-schema';

// @Controller()
// export class ChatListener {
//   constructor(private readonly chatService: ChatService) {}

//   @EventPattern('chat')
//   async handleChatEvent(@Payload() message: Message) {
//     console.log('Received message:', message);
//     // this.chatService.createMessage(message);
//   }
// }
