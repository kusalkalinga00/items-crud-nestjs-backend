export interface Item {
  id: string;
  itemName: string;
  status: ItemStatus;
}

export enum ItemStatus {
  WAITING = 'WAITING',
  DONE = 'DONE',
}
