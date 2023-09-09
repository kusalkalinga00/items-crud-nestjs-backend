import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ListService } from './list.service';
import { ItemStatus } from './list-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { UpdateItemStatus } from './dto/update-item-status.dto';
import { List } from './list.entity';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  //get all items or filter them by status or search
  @Get()
  getItems(@Query() filterDto: GetItemsFilterDto): Promise<List[]> {
    return this.listService.getItems(filterDto);
  }

  //create new item and save it in db
  @Post()
  createItem(
    @Body()
    createTaskDto: CreateItemDto,
  ): Promise<List> {
    return this.listService.createItem(createTaskDto);
  }

  //get item by id
  @Get('/:id')
  getItemsById(@Param('id') id: string): Promise<List> {
    return this.listService.getItemsById(id);
  }

  @Delete('/:id')
  deleteItemById(@Param('id') id: string): Promise<void> {
    return this.listService.deleteItemById(id);
  }

  @Patch('/:id/status')
  updateItemStatusById(
    @Param('id') id: string,
    @Body() updateItemStatus: UpdateItemStatus,
  ): Promise<List> {
    return this.listService.updateItemStatusById(id, updateItemStatus.status);
  }
}
