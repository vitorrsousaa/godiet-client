import { create } from './create';
import { remove } from './delete';
import { getAllByPatient } from './getAllByPatient';

export const planningMealServices = {
  create,
  getAllByPatient,
  delete: remove,
};
