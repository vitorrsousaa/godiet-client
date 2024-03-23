import { TFood } from './Food';
interface TMeasure {
  name: string;
  qty: number;
}

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
