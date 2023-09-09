import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ItemStatus } from './list-status.enum';

@Entity()
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemName: string;

  @Column()
  status: ItemStatus;
}
