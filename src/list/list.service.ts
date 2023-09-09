import { Injectable } from '@nestjs/common';
import { ItemStatus } from './list-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { List } from './list.entity';

@Injectable()
export class ListService {
  constructor(private listRepository: ListRepository) {}

  //get all items or filter them by status or search
  getItems(filterDto: GetItemsFilterDto): Promise<List[]> {
    return this.listRepository.getItems(filterDto);
  }

  //create new item and save it in db
  createItem(createItemDto: CreateItemDto): Promise<List> {
    return this.listRepository.createItem(createItemDto);
  }

  //getting an item by id

  async getItemsById(id: string): Promise<List> {
    const found = await this.listRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async deleteItemById(id: string): Promise<void> {
    const result = await this.listRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateItemStatusById(id: string, status: ItemStatus): Promise<List> {
    const item = await this.getItemsById(id);

    if (!item) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    item.status = status;
    await this.listRepository.save(item);
    return item;
  }
}
