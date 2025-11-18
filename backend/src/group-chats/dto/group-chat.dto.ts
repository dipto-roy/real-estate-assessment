import { IsOptional, IsUUID, IsString } from 'class-validator';

export class CreateGroupChatDto {
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @IsOptional()
  @IsString()
  mlsId?: string;

  @IsOptional()
  @IsString()
  propertyId?: string;
}

export class AddUserToChatDto {
  @IsUUID()
  userId: string;
}
