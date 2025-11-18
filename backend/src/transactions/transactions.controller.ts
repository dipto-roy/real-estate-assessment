import { Controller, Get, Post, Body, Query, UseGuards, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('projectId') projectId?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.transactionsService.findAll(projectId, page, limit);
  }
}
