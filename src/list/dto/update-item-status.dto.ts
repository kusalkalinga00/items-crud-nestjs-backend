import { IsEnum } from 'class-validator';
import { ItemStatus } from '../list.model';

export class UpdateItemStatus {
  @IsEnum(ItemStatus)
  status: ItemStatus;
}
