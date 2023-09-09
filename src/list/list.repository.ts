import { DataSource, Repository } from 'typeorm';
import { List } from './list.entity';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './list-status.enum';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';

@Injectable()
export class ListRepository extends Repository<List> {
  constructor(dataSource: DataSource) {
    super(List, dataSource.createEntityManager());
  }

  //get all items or filter them by status or search
  async getItems(filterDto: GetItemsFilterDto): Promise<List[]> {
    const query = this.createQueryBuilder('list');

    const { status, search } = filterDto;

    if (status) {
      query.andWhere('list.status = :status', { status });
    }

    if (search) {
      query.andWhere('(LOWER(list.itemName) LIKE LOWER(:search) )', {
        search: `%${search}%`,
      });
    }

    const items = await query.getMany();
    return items;
  }

  //create new item and save it in db
  async createItem(createItemDto: CreateItemDto): Promise<List> {
    const { itemName } = createItemDto;
    const item = this.create({
      itemName,
      status: ItemStatus.WAITING,
    });

    await this.save(item);
    return item;
  }
}
