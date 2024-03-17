import { create } from './create';
import { remove } from './delete';
import { getAll } from './getAll';

export const favoriteMealServices = {
  create,
  getAll,
  delete: remove,
};
