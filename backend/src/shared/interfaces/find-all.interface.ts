export interface IFindAllFilter {
  column: string;
  value: string | number | boolean;
}

export interface IFindAllOrder {
  column: string;
  sort: 'asc' | 'desc';
}
