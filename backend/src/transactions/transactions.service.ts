import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { paginate, PaginatedResult } from '../common/pagination.util';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: createTransactionDto,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll(projectId?: string, page: number = 1, limit: number = 10): Promise<PaginatedResult<any>> {
    const where = projectId ? { projectId } : {};
    
    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
          buyer: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          seller: {
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
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return paginate(transactions, total, page, limit);
  }
}
