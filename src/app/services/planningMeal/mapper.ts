import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanningEquivalent/CreatePlanningEquivalent.hook';

interface FoodToDatabase {
  portion: number;
  options: string[];
  categoryNameId: string;
}

interface MealToDatabase {
  foods: FoodToDatabase[];
  name: string;
  time: string;
}

interface PlanningMealToDatabase {
  name: string;
  meals: MealToDatabase[];
}

export function mapperPlanningMeal(
  planningMeal: TCreatePlanningMealDTO
): PlanningMealToDatabase {
  return {
    meals: planningMeal.meals.map(mapperMeals),
    name: planningMeal.name,
  };
}

function mapperMeals(meal: TCreatePlanningMealDTO['meals'][0]): MealToDatabase {
  return {
    foods: meal.foods.map(foodToDatabase),
    name: meal.name,
    time: meal.time,
  };
}

function foodToDatabase(
  food: TCreatePlanningMealDTO['meals'][0]['foods'][0]
): FoodToDatabase {
  return {
    categoryNameId: food.categoryId,
    portion: Number(food.portion),
    options: food.options.map((option) => option.foodId),
  };
}
