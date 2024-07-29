// src/chat/dto/create-message.dto.ts
import { IsString } from 'class-validator';
// import { User } from 'src/model/user.model';

export class CreateMessageDto {
  @IsString()
  readonly sender: string;

  @IsString()
  readonly recipient: string;

  @IsString()
  readonly content: string;
}
