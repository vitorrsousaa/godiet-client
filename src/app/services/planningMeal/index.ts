import { create } from './create';
import { remove } from './delete';
import { getAllByPatient } from './getAllByPatient';
import { update } from './update';

export const planningMealServices = {
  create,
  getAllByPatient,
  delete: remove,
  update: update,
};
