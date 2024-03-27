import { TFood, TMeasure } from './Food';

/**
 * Represents a food item within a meal.
 */
export interface TMealFood {
  id: string;
  measure: TMeasure;
  qty: number;
  food: TFood;
  name: string;
}

/**
 * Represents a meal.
 */
export interface TMeal {
  id: string;
  name: string;
  time: string;
  mealFoods: TMealFood[];
}
/**
 * Represents a planning meal.
 */
export interface TPlanningMeal {
  id: string;
  patientId: string;
  name: string;
  createdAt: string;
  meals: TMeal[];
}

export type TSummary = {
  prot: number;
  fat: number;
  carb: number;
  energy: number;
};

export type TPlanningMealWithSummary = TPlanningMeal & {
  summary: TSummary;
};
