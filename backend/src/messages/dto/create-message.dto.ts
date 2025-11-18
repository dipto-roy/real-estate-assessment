import { IsUUID, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  chatId: string;

  @IsUUID()
  senderId: string;

  @IsString()
  @MinLength(1)
  content: string;
}
