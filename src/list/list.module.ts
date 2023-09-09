import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListRepository } from './list.repository';

@Module({
  controllers: [ListController],
  providers: [ListService, ListRepository],
  imports: [TypeOrmModule.forFeature([List])],
})
export class ListModule {}
