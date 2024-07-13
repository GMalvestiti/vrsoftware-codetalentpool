import { ILike } from 'typeorm';
import { IFindAllFilter } from '../interfaces/find-all.interface';

export const handleFilter = (filter: IFindAllFilter | IFindAllFilter[]) => {
  if (!filter) return {};

  const filters = Array.isArray(filter) ? filter : [filter];

  const whereClause = {};

  for (const filter of filters) {
    if (typeof filter.value === 'string') {
      Object.assign(whereClause, {
        [filter.column]: ILike(`%${filter.value}%`),
      });

      continue;
    }

    Object.assign(whereClause, { [filter.column]: filter.value });
  }

  return whereClause;
};
