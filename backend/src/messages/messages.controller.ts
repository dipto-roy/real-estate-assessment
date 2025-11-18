import { Controller, Get, Post, Body, Query, UseGuards, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessagesGateway } from './messages.gateway';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesGateway: MessagesGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    
    // Emit real-time notification via WebSocket
    this.messagesGateway.notifyNewMessage(message);
    
    return message;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('chatId') chatId?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.messagesService.findAll(chatId, page, limit);
  }
}
