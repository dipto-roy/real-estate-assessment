import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { paginate, PaginatedResult } from '../common/pagination.util';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: createMessageDto,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        chat: {
          select: {
            id: true,
            projectId: true,
            mlsId: true,
            propertyId: true,
          },
        },
      },
    });

    return message;
  }

  async findAll(chatId?: string, page: number = 1, limit: number = 50): Promise<PaginatedResult<any>> {
    const where = chatId ? { chatId } : {};

    const [messages, total] = await Promise.all([
      this.prisma.message.findMany({
        where,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          chat: {
            select: {
              id: true,
              projectId: true,
              mlsId: true,
              propertyId: true,
            },
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.message.count({ where }),
    ]);

    return paginate(messages, total, page, limit);
  }
}
