import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { GroupChatsService } from './group-chats.service';
import { CreateGroupChatDto, AddUserToChatDto } from './dto/group-chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('group-chats')
export class GroupChatsController {
  constructor(private readonly groupChatsService: GroupChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) createGroupChatDto: CreateGroupChatDto) {
    return this.groupChatsService.create(createGroupChatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/users')
  addUser(@Param('id') id: string, @Body(ValidationPipe) addUserDto: AddUserToChatDto) {
    return this.groupChatsService.addUser(id, addUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.groupChatsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupChatsService.findOne(id);
  }
}
