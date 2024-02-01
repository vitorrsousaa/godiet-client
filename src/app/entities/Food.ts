/* eslint-disable @typescript-eslint/no-explicit-any */
export type TFood = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  categoryNameId: string;
  attributes?: Record<string, any>[] | undefined;
};
