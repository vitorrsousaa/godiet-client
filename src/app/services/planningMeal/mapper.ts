import { CreatePlanningMealInput } from './create';

interface FoodToDatabase {
  portion: number;
  options: string[];
}

interface MealToDatabase {
  foods: FoodToDatabase[];
}

interface PlanningMealToDatabase {
  name: string;
  meals: MealToDatabase[];
}

export function mapperPlanningMeal(
  planningMeal: CreatePlanningMealInput['planningMeal']
): PlanningMealToDatabase {
  return {
    meals: planningMeal.meals.map(mapperMeals),
    name: planningMeal.name,
  };
}

function mapperMeals(
  meal: CreatePlanningMealInput['planningMeal']['meals'][0]
): MealToDatabase {
  return {
    foods: meal.foods.map(foodToDatabase),
  };
}

function foodToDatabase(
  food: CreatePlanningMealInput['planningMeal']['meals'][0]['foods'][0]
): FoodToDatabase {
  return {
    portion: Number(food.portion),
    options: food.options.map((option) => option.foodId),
  };
}
