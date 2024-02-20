import { create } from './create';
import { remove } from './delete';
import { getAll } from './getAll';
import { update } from './update';

export const anamnesisServices = {
  create,
  getAll,
  update,
  delete: remove,
};
