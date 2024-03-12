import { create } from './create';
import { remove } from './delete';
import { getAll } from './getAll';
import { getById } from './getById';
import { update } from './update';

export const patientServices = {
  create,
  getAll,
  getById,
  update,
  delete: remove,
};
