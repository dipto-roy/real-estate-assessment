import { IsUUID, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  buyerId: string;

  @IsUUID()
  sellerId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
