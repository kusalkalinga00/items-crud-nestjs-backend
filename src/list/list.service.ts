import { Injectable } from '@nestjs/common';
import { Item, ItemStatus } from './list.model';
import { v4 as uuid } from 'uuid';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ListService {
  private list: Item[] = [];

  //get All Items
  getAllItems(): Item[] {
    return this.list;
  }

  //create a new item
  createItem(createTaskDto: CreateItemDto): Item {
    const { itemName } = createTaskDto;
    const item: Item = {
      id: uuid(),
      itemName: itemName,
      status: ItemStatus.WAITING,
    };

    this.list.push(item);
    return item;
  }

  //getting an item by id
  getItemById(id: string): Item {
    const found = this.list.find((item) => item.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  //deleting an item by id
  deleteItemById(id: string): void {
    const found = this.getItemById(id);
    this.list = this.list.filter((item) => item.id !== found.id);
  }

  //updating an item status by id
  updateItemStatusById(id: string, status: ItemStatus): Item {
    const item = this.getItemById(id);
    item.status = status;
    return item;
  }

  //filtering items by status
  getItemsWithFilters(filterDto: GetItemsFilterDto): Item[] {
    const { status, search } = filterDto;

    let items = this.getAllItems();

    if (status) {
      items = items.filter((item) => item.status === status);
    }

    if (search) {
      items = items.filter(
        (item) =>
          item.itemName.includes(search) || item.status.includes(search),
      );
    }

    return items;
  }
}
