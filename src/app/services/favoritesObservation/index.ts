import { create } from './create';
import { remove } from './delete';
import { getAll } from './getAll';

export const favoritesObservationServices = {
  getAll,
  create,
  delete: remove,
};
