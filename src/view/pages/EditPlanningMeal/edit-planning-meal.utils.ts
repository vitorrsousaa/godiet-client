import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { TPlanningMeal } from '@godiet-entities';

export function mapperPlanningMealToEdit(
  data: TPlanningMeal
): TCreatePlanningMealDTO {
  return {
    name: data.name,
    meals: data.meals.map((meal) => {
      const date = new Date(meal.time);
      const initialTime = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      return {
        time: initialTime,
        name: meal.name,
        mealFoods: meal.mealFoods.map((mealFood) => ({
          name: mealFood.name,
          foodId: mealFood.foodId,
          qty: mealFood.qty,
          measure: mealFood.measure,
        })),
      };
    }),
  };
}
