import { create } from './create';
import { remove } from './delete';
import { getAll } from './getAll';

export const anamnesisTemplateServices = {
  create,
  getAll,
  delete: remove,
};
