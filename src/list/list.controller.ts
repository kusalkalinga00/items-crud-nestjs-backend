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
import { Item, ItemStatus } from './list.model';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { UpdateItemStatus } from './dto/update-item-status.dto';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  getItems(@Query() filterDto: GetItemsFilterDto): Item[] {
    if (Object.keys(filterDto).length) {
      return this.listService.getItemsWithFilters(filterDto);
    } else {
      return this.listService.getAllItems();
    }
  }

  @Post()
  createItem(
    @Body()
    createTaskDto: CreateItemDto,
  ): Item {
    return this.listService.createItem(createTaskDto);
  }

  @Get('/:id')
  getItemById(@Param('id') id: string): Item {
    return this.listService.getItemById(id);
  }

  @Delete('/:id')
  deleteItemById(@Param('id') id: string): void {
    return this.listService.deleteItemById(id);
  }

  @Patch('/:id/status')
  updateItemStatusById(
    @Param('id') id: string,
    @Body() updateItemStatus: UpdateItemStatus,
  ): Item {
    return this.listService.updateItemStatusById(id, updateItemStatus.status);
  }
}
