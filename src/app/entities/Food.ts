import { TCategoryName } from './CategoryName';

export type TAttribute = {
  qty: number;
  name: string;
  unit: string;
};
export type TMeasure = {
  qty: number;
  name: string;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export type TFood = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  categoryNameId: string;
  attributes: TAttribute[];
  measures: TMeasure[];
  categoryName?: TCategoryName;
};
