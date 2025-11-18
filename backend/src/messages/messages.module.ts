import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, PrismaService],
  exports: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
