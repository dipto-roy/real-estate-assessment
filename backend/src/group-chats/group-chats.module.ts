import { Module } from '@nestjs/common';
import { GroupChatsController } from './group-chats.controller';
import { GroupChatsService } from './group-chats.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [GroupChatsController],
  providers: [GroupChatsService, PrismaService],
  exports: [GroupChatsService],
})
export class GroupChatsModule {}
