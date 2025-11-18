import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateGroupChatDto, AddUserToChatDto } from './dto/group-chat.dto';

@Injectable()
export class GroupChatsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupChatDto: CreateGroupChatDto) {
    return this.prisma.groupChat.create({
      data: createGroupChatDto,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        groupChatUsers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async addUser(chatId: string, addUserDto: AddUserToChatDto) {
    return this.prisma.groupChatUser.create({
      data: {
        chatId,
        userId: addUserDto.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        chat: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.groupChat.findMany({
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        groupChatUsers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.groupChat.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        groupChatUsers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
          orderBy: {
            timestamp: 'desc',
          },
          take: 50,
        },
      },
    });
  }
}
