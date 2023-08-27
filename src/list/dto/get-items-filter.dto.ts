import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ItemStatus } from '../list.model';

export class GetItemsFilterDto {
  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
