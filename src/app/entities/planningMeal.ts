import { TFood } from './Food';

export interface TPlanningMealDetails {
  id: string;
  patientId: string;
  date: string;
  meals: TMealsDetails[];
  name: string;
  createdAt: string;
}

interface TMealsDetails {
  id: string;
  name: string;
  planningMealId: string;
  time: string;
  foods: TFoodDetails[];
}

interface TFoodDetails {
  id: string;
  categoryNameId: string;
  portion: number;
  options: TFood[];
}
