import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GroupChatsModule } from './group-chats/group-chats.module';
import { MessagesModule } from './messages/messages.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProjectsModule,
    TransactionsModule,
    GroupChatsModule,
    MessagesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
