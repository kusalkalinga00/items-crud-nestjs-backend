import { IsEnum } from 'class-validator';
import { ItemStatus } from '../list-status.enum';

export class UpdateItemStatus {
  @IsEnum(ItemStatus)
  status: ItemStatus;
}
