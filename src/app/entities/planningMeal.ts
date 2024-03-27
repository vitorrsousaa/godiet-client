import { TFood, TMeasure } from './Food';

export interface TMealFood {
  id: string;
  measure: TMeasure;
  qty: number;
  options: [];
  food: TFood;
  name: string;
}

export interface TMeal {
  id: string;
  name: string;
  time: string;
  mealFoods: TMealFood[];
}

export interface TPlanningMeal {
  id: string;
  patientId: string;
  name: string;
  createdAt: string;
  meals: TMeal[];
}
